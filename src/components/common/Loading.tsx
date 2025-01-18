import Lottie from "lottie-react";
import animationData from "../animations/lottie-loading.json";
import PageHeader from "./PageHeader";

const Loading = () => {
  return (
    <>
      <div className="size-64 mx-auto">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-full h-full"
        />
      </div>
      <PageHeader className="text-center">Loading ...</PageHeader>
    </>
  );
};

export default Loading;
