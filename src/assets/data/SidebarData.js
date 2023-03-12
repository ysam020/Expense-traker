import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";

export const sidebarData = [
  { id: 1, icon: <HomeRoundedIcon />, name: "Dashboard", url: "dashboard" },
  {
    id: 2,
    icon: <HomeRoundedIcon />,
    name: "Transactions",
    url: "transactions",
  },
  {
    id: 3,
    icon: <AccountBalanceRoundedIcon />,
    name: "Accounts",
    url: "accounts",
  },
  {
    id: 4,
    icon: <AssessmentRoundedIcon />,
    name: "Analysis",
    url: "analysis",
  },
  {
    id: 5,
    icon: <SavingsRoundedIcon />,
    name: "Budgets",
    url: "budgets",
  },
  {
    id: 6,
    icon: <FlagRoundedIcon />,
    name: "Goals",
    url: "goals",
  },
  {
    id: 7,
    icon: <SettingsRoundedIcon />,
    name: "Settings",
    url: "settings",
  },
  {
    id: 8,
    icon: <Person2RoundedIcon />,
    name: "Profile",
    url: "profile",
  },
];
