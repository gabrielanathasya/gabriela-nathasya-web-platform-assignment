import { merge, namespaced } from "overmind/config"
import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
} from "overmind-react"
import { state } from "./state"
import * as contact from "./contact"

import { createOvermind } from "overmind"

export const config = merge(
  {
    state,
  },
  namespaced({
    contact,
  })
)

export const overmind = createOvermind(config, {
  devtools: true, //"localhost:3000",
})
export const useAppState = createStateHook()
export const useActions = createActionsHook()
export const useEffects = createEffectsHook()
export const useReaction = createReactionHook()
