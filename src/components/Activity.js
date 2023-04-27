import React, { useState, useEffect, useContext } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { UserContext } from "../context/Context";
import firebase from "firebase/app";
import { getActivitiesData } from "../utils/getActivitiesData";

export default function Activity() {
  const user = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getActivitiesData(user, setData);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h2>Timeline</h2>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {data.slice(0, 4).map((val, id) => {
          const timestamp = val.data().date; // example timestamp
          const date = new firebase.firestore.Timestamp(
            timestamp.seconds,
            timestamp.nanoseconds
          ).toDate();
          const month = new Intl.DateTimeFormat("en-US", {
            month: "short",
          }).format(date);

          const isLastItem = id === data.length - 1;

          const timelineDotBg = id % 2 === 0 ? "#2991EE" : "#00E396";
          const bgColor = id % 2 === 0 ? "#2991EE7f" : "#00E3967f";

          return (
            <TimelineItem key={id}>
              <TimelineOppositeContent color="text.secondary">
                {`${date.getDate()} ${month}`}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    backgroundColor: timelineDotBg,
                  }}
                />
                {!isLastItem && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent
                sx={{
                  backgroundColor: bgColor,
                  marginLeft: "20px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                  fontSize: "0.8rem",
                }}
              >
                {val.data().title}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </>
  );
}
