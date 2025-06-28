import type { StateCreator } from "zustand";
import { GeneratorService } from "../../services/generator";
import type { StoreState } from "../store";

export interface GeneratorSlice {
  resetFileState: () => void;
  generateFile: () => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  isSuccess: boolean;
  setIsSuccess: (isSuccess: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
}

export const createGeneratorSlice: StateCreator<
  Pick<StoreState, "generator">,
  [],
  [],
  Pick<StoreState, "generator">
> = (set, get) => ({
  generator: {
    resetFileState: () => {
      set((state) => ({
        generator: {
          ...state.generator,
          error: null,
          isLoading: false,
          isSuccess: false,
        },
      }));
    },

    generateFile: async () => {
      get().generator.resetFileState();

      set((state) => ({
        generator: {
          ...state.generator,
          isLoading: true,
        },
      }));

      try {
        await GeneratorService.generateFile();

        set((state) => ({
          generator: {
            ...state.generator,
            isLoading: false,
            isSuccess: true,
          },
        }));
      } catch {
        set((state) => ({
          generator: {
            ...state.generator,
            isLoading: false,
            error: "Не удалось сгенерировать файл.",
          },
        }));
      }
    },

    isLoading: false,
    setIsLoading: (isLoading: boolean) => {
      set((state) => ({
        generator: {
          ...state.generator,
          isLoading,
        },
      }));
    },

    isSuccess: false,
    setIsSuccess: (isSuccess: boolean) => {
      set((state) => ({
        generator: {
          ...state.generator,
          isSuccess,
        },
      }));
    },

    error: null,
    setError: (error: string | null) => {
      set((state) => ({
        generator: {
          ...state.generator,
          error,
        },
      }));
    },
  },
});
