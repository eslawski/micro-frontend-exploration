import { PharosLink } from "@ithaka/pharos/lib/components/link/pharos-link";
import { PharosButton } from "@ithaka/pharos/lib/components/button/pharos-button";
import { PharosIcon } from "@ithaka/pharos/lib/components/icon/pharos-icon";
import { PharosDropdownMenu } from "@ithaka/pharos/lib/components/dropdown-menu/pharos-dropdown-menu";
import { PharosDropdownMenuItem } from "@ithaka/pharos/lib/components/dropdown-menu/pharos-dropdown-menu-item";
import { PharosDropdownMenuNav } from "@ithaka/pharos/lib/components/dropdown-menu-nav/pharos-dropdown-menu-nav";
import { PharosDropdownMenuNavLink } from "@ithaka/pharos/lib/components/dropdown-menu-nav/pharos-dropdown-menu-nav-link";
import registerComponents from "@ithaka/pharos/lib/utils/registerComponents";

registerComponents("mfe-navigation", [
    PharosLink,
    PharosButton,
    PharosIcon,
    PharosDropdownMenu,
    PharosDropdownMenuItem,
    PharosDropdownMenuNav,
    PharosDropdownMenuNavLink,
]);