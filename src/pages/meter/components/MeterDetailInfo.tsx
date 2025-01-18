import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { Meter } from "../../../types/Meter";

function MeterDetailInfo({ meterDetails }: { meterDetails?: Meter }) {
  return (
    <section className="grid grid-cols-2 gap-4 mb-4">
      <p>
        <strong>Meter Date: </strong>
        <Tooltip>
          <TooltipTrigger>{"—"}</TooltipTrigger>
          <TooltipContent>
            <p>{"Date not provided by API"}</p>
          </TooltipContent>
        </Tooltip>
      </p>
      <p>
        <strong>Location:</strong> {meterDetails?.location}
      </p>
      <p>
        <strong>Status:</strong> {meterDetails?.status}
      </p>
      <p>
        <strong>Number of Digits:</strong> {meterDetails?.numberOfDigits}
      </p>
    </section>
  );
}

export default MeterDetailInfo;
