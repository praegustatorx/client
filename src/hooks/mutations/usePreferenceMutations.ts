// src/hooks/usePreferenceMutations.ts

import axios, { all } from "axios";
import * as api from "../../api/api";
import { useMutation, useQueryClient } from "react-query";
// this approach is so much bettter, should have done this earlier.
export const usePreferenceMutations = (userId: string) => {
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["preferences", userId] });
  };

  const addAllergy = useMutation({
    mutationFn: async (allergy: string) => api.addAllergy(userId, allergy),
    onSuccess: refresh,
  });

  const deleteAllergy = useMutation({
    mutationFn: async (allergy: string) => api.deleteAllergy(userId, allergy),
    onSuccess: refresh,
  });

  const addDiet = useMutation({
    mutationFn: async (diet: { name: string; description: string }) =>
      api.addDiet(userId, diet),
    onSuccess: refresh,
  });

  const deleteDiet = useMutation({
    mutationFn: async (dietName: string) => api.deleteDiet(userId, dietName),
    onSuccess: refresh,
  });

  const addBlacklist = useMutation({
    mutationFn: async (ingredient: string) =>
      api.addBlacklist(userId, ingredient),
    onSuccess: refresh,
  });

  const deleteBlacklist = useMutation({
    mutationFn: async (ingredient: string) =>
      api.deleteBlacklist(userId, ingredient),
    onSuccess: refresh,
  });

  return {
    addAllergy,
    deleteAllergy,
    addDiet,
    deleteDiet,
    addBlacklist,
    deleteBlacklist,
  };
};
