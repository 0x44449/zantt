import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "@/apps/moo/stores";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;