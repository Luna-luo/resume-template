import NewProfileCV from "./newProfileCV";
import { useAppSelector } from "@/lib/hooks";
import TempResumePage from "../resume/TempResumePage";

interface SplitWindowResumeProps {
  new: Boolean
}

const SplitWindowResume: React.FC<SplitWindowResumeProps> = (Props: SplitWindowResumeProps) => {
  const company = useAppSelector(state => state.company.value)
  const paramsPromise = Promise.resolve({ company: company });
  return (
    <>
      <div className="split-window">
        <div className="left-page json-template">
          <NewProfileCV new={Props.new} />
        </div>
        <div className="right-page preview">
          <TempResumePage params={paramsPromise} />
        </div>
      </div>
      <style jsx>{
        `
         .split-window {
           padding: 10px;
           display: flex;
         }
        .left-page {
        flex: 1;
        }
        .right-page {
          flex: 1;
          width: 100%;
          max-width: 800px;  /* 设置最大宽度 */
          transform: scale(0.75);  /* 缩放至 90% */
          transform-origin: top left;  /* 从左上角缩放 */
        }
      `}
      </style>
    </>
  )
}

export default SplitWindowResume