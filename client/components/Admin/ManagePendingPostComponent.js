import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { fetchData } from "../../libs/fetchData";
import { adminActions } from "../../actions/adminActions";
import { approvePost, rejectPost } from "../../actions/postActions";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";
import PreviewPostConponent from "../Dialog/PreviewPostComponent";
import AlertDialog from "../Dialog/AlertDialogComponent";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "15%",
  },
  div: { textAlign: "center" },
}));

const PendingPostTableComponent = ({ isChange }) => {
  const classes = useStyles();
  const columns = [
    { title: "Tiêu đề", field: "title", width: "50%" },
    { title: "Tác giả", field: "author" },
    { title: "id", field: "_id", hidden: true },
    { title: "Author id", field: "author_id", hidden: true },
  ];

  const [pendingPost, setPendingPost] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertResult, setAlertResult] = useState("");
  const [expectedResult, setExpectedResult] = useState("");
  const [target, setTarget] = useState({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    let unmounted = false;
    fetchData(`${SERVER_URL}/post/get-pending-post`).then((res) => {
      if (!unmounted) {
        setPendingPost(
          res.data.map((item) => {
            return {
              title: item.title,
              author: item.fullname,
              _id: item._id,
              author_id: item.author_id,
            };
          })
        );
      }
      setFetching(false);
    });
    return () => {
      unmounted = true;
    };
  }, []);

  const handleApprove = (post) => {
    setTitle(
      '<div>Bạn có chắc muốn</div><div style="background-color: #e7e7e7; margin-right: 4px; margin-left: 4px; font-weight: bold">DUYỆT</div><div>bài viết này?</div>'
    );
    setTarget(post);
    setExpectedResult("APPROVE");
    setAlertResult("");
    setAlert(true);
  };

  const handleReject = (post) => {
    setTitle(
      '<div>Bạn có chắc muốn</div><div style="background-color: #e7e7e7; margin-right: 4px; margin-left: 4px; font-weight: bold">TỪ CHỐI</div><div>bài viết này?</div>'
    );
    setTarget(post);
    setExpectedResult("REJECT");
    setAlertResult("");
    setAlert(true);
  };

  const handleOpen = (rowData) => {
    setData(rowData);
    setOpen(true);
  };

  const handleClose = (isClose) => {
    setOpen(isClose);
  };

  useEffect(() => {
    if (alertResult == "APPROVE") {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            let initdata = pendingPost;
            const index = initdata.indexOf(target);
            const approveItem = initdata[index];
            initdata.splice(index, 1);
            isChange(false);
            approvePost({ id: target._id, author_id: target.author_id });
            isChange(true);
            setPendingPost([...initdata]);
          }
          resolve();
        }, 600);
      });
    }
    if (alertResult == "REJECT") {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            let initdata = pendingPost;
            const index = initdata.indexOf(target);
            const deletePost = initdata[index];
            initdata.splice(index, 1);
            isChange(false);
            rejectPost({ id: target._id, author_id: target.author_id });
            isChange(true);
            setPendingPost([...initdata]);
          }
          resolve();
        }, 600);
      });
    }
    setTarget({});
    setTitle("");
    setExpectedResult("");
    setAlertResult("");
    setAlert(false);
  }, [alertResult]);

  return isFetching ? (
    <div className={classes.div}>
      <CircularProgress className={classes.loading} />
    </div>
  ) : (
    <div>
      <MaterialTable
        title="QUẢN LÝ BÀI VIẾT ĐANG CHỜ"
        columns={columns}
        data={pendingPost}
        actions={[
          (rowData) => ({
            icon: () => <VisibilityIcon />,
            tooltip: "Preview",
            onClick: (event, rowData) => handleOpen(rowData),
          }),
          (rowData) => ({
            icon: () => <CheckCircleIcon />,
            tooltip: "Approve",
            onClick: (event, rowData) => {
              handleApprove(rowData);
            },
          }),
          (rowData) => ({
            icon: () => <BlockIcon />,
            tooltip: "Reject",
            onClick: (event, rowData) => {
              handleReject(rowData);
            },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          tableLayout: "fixed",
          loadingType: "overlay",
        }}
      />
      {alert && (
        <AlertDialog
          message={title}
          setDisplay={setAlert}
          btnOK={setAlertResult}
          expectedResult={expectedResult}
        />
      )}
      <PreviewPostConponent
        isOpen={open}
        isClose={handleClose}
        rowData={data}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    isChange: bindActionCreators(adminActions.isChange, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(PendingPostTableComponent);
