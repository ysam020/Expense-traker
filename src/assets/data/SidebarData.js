import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";

export const sidebarData = [
  { id: 1, icon: <HomeRoundedIcon />, name: "Dashboard", url: "dashboard" },
  {
    id: 2,
    icon: <PaidRoundedIcon />,
    name: "Transactions",
    url: "transactions",
  },
  {
    id: 3,
    icon: <FlagRoundedIcon />,
    name: "Goals",
    url: "goals",
  },
];
