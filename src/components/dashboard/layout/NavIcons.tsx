import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { ChartPie as ChartPieIcon } from "@phosphor-icons/react/dist/ssr/ChartPie";
import { GearSix as GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { PlugsConnected as PlugsConnectedIcon } from "@phosphor-icons/react/dist/ssr/PlugsConnected";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { XSquare as XSquareIcon } from "@phosphor-icons/react/dist/ssr/XSquare";
import { Notebook as NotebookIcon } from "@phosphor-icons/react/dist/ssr/Notebook";
import { Note as NoteIcon } from "@phosphor-icons/react/dist/ssr/Note";
import { Truck as TruckIcon } from "@phosphor-icons/react/dist/ssr/Truck";

export const navIcons = {
  overview: ChartPieIcon,
  items: NoteIcon,
  orders: NotebookIcon,
  account: UserIcon,
  suppliers: TruckIcon,
  settings: GearSixIcon,
  "plugs-connected": PlugsConnectedIcon,
  "x-square": XSquareIcon,
} as Record<string, Icon>;
