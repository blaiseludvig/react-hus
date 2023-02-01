import { ReactElement, ReactPortal } from "react";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

type Props = {
  heading: string;
  children: ReactNode;
};

// source: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d076add9f29db350a19bd94c37b197729cc02f87/types/react/index.d.ts

export default function Toast(props: Props) {
  const { children, heading } = props;

  return (
    <>
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div
          id="liveToast"
          className="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header bg-success text-white fs-4">
            <strong className="me-auto">{heading}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            <>{children}</>
          </div>
        </div>
      </div>
    </>
  );
}
