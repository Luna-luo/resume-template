import NewProfile from "./newProfileCV";
import { useAppSelector } from "@/lib/hooks";
import TempResumePage from "../resume/TempResumePage";
import NewProfileCL from "./newProfileCL";
import TempCoverLetter from "../resume/TempCoverLetter";

interface SplitWindowCLProps {
  new: Boolean
}

export default function SplitWindowCL(Props: SplitWindowCLProps) {
  const company = useAppSelector(state => state.company.value)
  const paramsPromise = Promise.resolve({ company: company });
  return (
    <>
      <div className="split-window">
        <div className="left-page json-template">
          <NewProfileCL new={Props.new} />
        </div>
        <div className="right-page preview">
          <TempCoverLetter params={paramsPromise} />
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