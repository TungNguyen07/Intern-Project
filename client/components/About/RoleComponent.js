import React from "react";
import { Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    color: "black",
  },
  title: {
    marginBottom: "0.5rem",
  },
  Typography: {
    marginBottom: "0.5rem",
  },
});

const RoleComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">
        2. Chức năng và quyền hạn
      </Typography>
      <div>
        <Typography className={classes.Typography}>
          2.1 Phát triển sự nghiệp văn hóa – thể thao, tổ chức các hoạt động
          tuyên truyền, phổ biến chủ trương, chính sách, đường lối của Đảng,
          pháp luật Nhà nước, thực hiện các nhiệm vụ chính trị, kinh tế, văn hóa
          – xã hội của địa phương;
        </Typography>
        <Typography className={classes.Typography}>
          2.2 Hướng dẫn về chuyên môn nghiệp vụ cho các cán bộ làm công tác văn
          hóa – thể thao ở cơ sở;
        </Typography>
        <Typography className={classes.Typography}>
          2.3 Tổ chức, cung ứng dịch vụ công, đáp ứng nhu cầu hoạt độgn văn hóa,
          văn nghệ, thể dục, thể thao, nhu cầu tiếp nhận thông tin, nâng cao dân
          trí của nhân dân trên địa bàn;
        </Typography>
        <Typography className={classes.Typography}>
          2.4 Tổ chức các hoạt động văn hóa, văn nghệ, tuyên truyền cổ động, đọc
          sách báo, giải trí, chiếu phim, câu lạc bộ, nhóm sở thích, lớp năng
          khiếu nghệ thuật;
        </Typography>
        <Typography className={classes.Typography}>
          2.5 Tổ chức các hoạt động thể dục, thể thao; hướng dẫn kỹ thuật,
          phương pháp và điều kiện tập luyện cho các tổ chức và cá nhân;
        </Typography>
        <Typography className={classes.Typography}>
          2.6 Tổ chức các cuộc liên hoan, hội thi, hội diễn, thi đấu và hướng
          dẫn phong trào văn hóa-văn nghệ, thể dục-thể thao ở cơ sở;
        </Typography>
        <Typography className={classes.Typography}>
          2.7 Phát hiện và bồi dưỡng năng khiếu văn hóa-văn nghệ, thể dục-thể
          thao;
        </Typography>
        <Typography className={classes.Typography}>
          2.8 Tổ chức các hoạt động tác nghiệp chuyên môn, các hoạt động dịch vụ
          văn hóa, thể thao và các hoạt động dịch vụ khác đáp ứng nhu cầu của
          nhân dân địa phương đảm bảo đúng quy định của pháp luật và phù hợp với
          điều kiện cơ sở vật chất của tổ chức sự nghiệp;
        </Typography>
        <Typography className={classes.Typography}>
          2.9 Hợp tác, giao lưu, trao đổi chuyên môn nghiệp vụ và các hoạt động
          trong lĩnh vực văn hóa, thể thao và du lịch với các đơn vị, tổ chức
          trong và ngoài tỉnh, thành phố trực thuộc Trung ương;
        </Typography>
        <Typography className={classes.Typography}>
          2.10 Quản lý công chức, viên chức, tài chính và tài sản theo quy định
          của pháp luật;
        </Typography>
        <Typography className={classes.Typography}>
          2.11 Thực hiện các nhiệm vụ, quyền hạn khác do Ủy ban nhân dân cấp
          thành phố giao.
        </Typography>
      </div>
    </div>
  );
};

export default RoleComponent;
