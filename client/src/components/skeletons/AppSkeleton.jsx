import React from "react";
import Spinner from "../UI/Spinner";

function AppSkeleton() {
  return (
    <div className="bg-red-900 w-screen h-screen flex items-center justify-between">
      <Spinner className="w-[4rem] h-[4rem]" />
    </div>
  );
}

export default AppSkeleton;
