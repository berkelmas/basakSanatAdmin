import { Injectable } from "@angular/core";

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: "",
    name: "Genel",
    type: "saperator",
    icon: "av_timer",
  },
  {
    state: "projects",
    name: "Projeler",
    type: "link",
    icon: "av_timer",
  },
  {
    state: "scholarships",
    name: "Burslar",
    type: "link",
    icon: "av_timer",
  },
  {
    state: "scholarships-apply",
    name: "Burs Başvuruları",
    type: "link",
    icon: "av_timer",
  },
  {
    state: "announcements",
    name: "Duyurular",
    type: "link",
    icon: "av_timer",
  },
  {
    state: "workshops",
    name: "Atölyeler",
    type: "link",
    icon: "av_timer",
  },
  {
    state: "workshops-apply",
    name: "Atölye Başvuruları",
    type: "link",
    icon: "av_timer",
  },
  {
    state: "contacts",
    name: "İletişim",
    type: "link",
    icon: "av_timer",
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
