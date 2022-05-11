import React, { HTMLAttributes, HtmlHTMLAttributes } from "react";
import { AnimatePresence, motion, Variants, Transition } from "framer-motion";
import { DismissButton } from "./index.styled";
import { CloseIcon } from "../../icons";

export interface IModal extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  canDismissable?: boolean;
  onDismiss?: () => void;
  backdrop?: string;
}

const ModalVariants: Variants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};
const spring: Transition = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

const Modal = (props: IModal) => {
  const {
    visible,
    canDismissable = true,
    onDismiss,
    backdrop = "rgba(0, 0, 0, 0)",
    children,
    ...rest
  } = props;
  return (
    <>
      {visible && (
        <div className="fixed inset-x-0 inset-y-0 z-20 flex flex-col justify-end items-center">
          <div
            onClick={() => canDismissable && onDismiss && onDismiss()}
            style={{ backgroundColor: backdrop }}
            className="absolute z-20 inset-x-0 inset-y-0"
          ></div>
          <AnimatePresence initial={false} exitBeforeEnter>
            <motion.div
              transition={spring}
              animate={visible ? "open" : "closed"}
              variants={ModalVariants}
              className="relative z-50 bg-white shadow-[0px_4px_10px_#00000008] rounded-3xl p-5 md:p-8 lg:p-10 w-11/12 md:w-1/2 lg:w-2/6 transition-all my-5 lg:my-10"
            >
              {children}
              <div className="absolute -bottom-4 inset-x-0 flex flex-col justify-center items-center">
                <DismissButton
                  onClick={onDismiss}
                  className="flex flex-col justify-center items-center w-8 h-8"
                >
                  <CloseIcon />
                </DismissButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default Modal;
