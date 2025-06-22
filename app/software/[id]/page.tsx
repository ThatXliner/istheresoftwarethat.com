import { Suspense } from "react";
import { useParams } from "next/navigation";
import DetailsComponent from "../DetailsComponent";

const SoftwareDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">
              Loading software details...
            </p>
          </div>
        </div>
      }
    >
      <DetailsComponent id={id} />
    </Suspense>
  );
};

export default SoftwareDetailsPage;
