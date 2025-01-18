import PageHeader from "../../components/common/PageHeader";
import NotFoundIcon from "../../components/icons/NotFoundIcon";

function NotFoundPage() {
  return (
    <>
      <div className="max-w-64 w-full mx-auto py-20">
        <NotFoundIcon className="w-full" />
      </div>

      <PageHeader className="text-center">Page Not Found</PageHeader>
    </>
  );
}

export default NotFoundPage;
