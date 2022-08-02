import { FC, ReactElement } from "react";

const VerticalScrollable: FC<{ children: ReactElement | ReactElement[] }> = ({children}): ReactElement => {
  return (
    < div className="h-full overflow-y-auto overflow-x-hidden" >
      {/** viewport */}
      < div className="flex-1" >
        {children}
      </div >
    </div >
  )
}

export default VerticalScrollable;