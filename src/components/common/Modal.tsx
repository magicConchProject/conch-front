"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type Props = {
    children: React.ReactNode;
    open: boolean;
    title?: string;
    setOpen: (open: boolean) => void;
    maxWidth?: string;
};

export default function Modal({ children, open, setOpen, title, maxWidth = "max-w-md" }: Props) {
    function closeModal() {
        setOpen(false);
    }

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal} autoFocus={false}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`w-full ${maxWidth} transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle transition-all`}
                            >
                                <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900 ">
                                    {title}
                                </Dialog.Title>

                                <div className="mt-3">{children}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
