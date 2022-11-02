import { Button, Stack } from "@mui/material";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { FaThumbsUp } from "react-icons/fa";

import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import InCorrectButton from "./InCorrectButton";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BoxSentiment = (props: {
  emoji: string;
  sentiment: string;
  neu: string;
  pos: string;
  neg: string;
  q: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { sentiment, emoji } = props;

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: "กราฟแท่งแสดงความน่าจะเป็นของข้อความแต่ละประเภท"
      }
    },
    scales: {
      x: {
        min: 0,
        max: 1,
        stepSize: 0.25
      }
    }
  };

  const labels = ["ทั่วไป", "เชิงบวก", "เชิงลบ", "คำถาม"];

  const data = {
    labels,
    datasets: [
      {
        label: "ความน่าจะเป็น",
        data: [props.neu, props.pos, props.neg, props.q],
        borderColor: "rgb(15, 1, 191)",
        backgroundColor: "rgba(15, 1, 191, 0.6)"
      }
    ]
  };

  return (
    <>
      <CardContent style={{ width: "90%", height: "70%" }}>
        <h2
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
            fontSize: 30
          }}
        >
          ข้อความนี้คือ : {sentiment} {emoji}
        </h2>
        <div
          style={{
            minHeight: 100,
            paddingTop: "33.33333%",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0
            }}
          >
            <Bar options={options} data={data} />
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <p style={{}}>ผลการวิเคราะห์ถูกต้องหรือไม่</p>
          <Button
            variant="outlined"
            startIcon={<FaThumbsUp />}
            size="medium"
            color="success"
            onClick={handleClick}
          >
            ถูกต้อง
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={1200}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              ขอบคุณสำหรับข้อเสนอแนะ
            </Alert>
          </Snackbar>
          <InCorrectButton />
        </Stack>
      </CardActions>
    </>
  );
};

export default BoxSentiment;
