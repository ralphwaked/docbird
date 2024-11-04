import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarClock,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Circle,
  Copy,
  Eye,
  EyeOff,
  File,
  FormInput,
  Globe,
  GripVertical,
  Lock,
  type LucideIcon,
  Mail,
  Menu,
  Minus,
  MoreHorizontal,
  Rocket,
  Search,
  Settings,
  Shield,
  X,
} from "lucide-react"

import FingerprintSm from "./custom/fingerprint"
import Google from "./custom/google"
import LinkedIn from "./custom/linkedin"
import Logo from "./custom/logo"
import LogoIcon from "./custom/logo-icon"
import LogoWordmark from "./custom/logo-wordmark"

export type Icon =
  | LucideIcon
  | React.ComponentType<React.SVGProps<SVGSVGElement>>

export const Icons = {
  // brand
  Logo,
  LogoIcon,
  LogoWordmark,

  // custom
  Google,
  LinkedIn,
  FingerprintSm,

  // lucide
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  MoreHorizontal,
  Settings,
  Check,
  Search,
  Copy,
  X,
  Minus,
  Eye,
  EyeOff,
  GripVertical,
  Circle,
  Lock,
  Mail,
  InputPassword: FormInput,
  Rocket,
  Shield,
  Globe,
  File,
  Bell,
  Menu,
  ChartNoAxesColumn,
  Archive,
  CalendarClock,
} satisfies Record<string, Icon>
