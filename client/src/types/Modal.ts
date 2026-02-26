import type { ReactElement } from "react";

export interface Modal {
  open: boolean,
  onClose: () => void
}