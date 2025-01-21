import React from "react";

import { Feed } from "../_components/feed";
import { Inbox } from "../_components/inbox";
import { SideNav } from "../_components/side-nav";

const HomePage: React.FC = () => {
  return (
    <div className="flex w-full gap-4">
      <SideNav />
      <Feed />
      <div className="sticky max-w-[360px] flex-1 rounded-md">
        <Inbox />
      </div>
    </div>
  );
};

export default HomePage;
