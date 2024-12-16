import { Pinia, PiniaCustomProperties } from "pinia";
import { useAuthStore } from "../store/auth.store.c";
import {
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useAuthStore();
  if (!store.isloggedIn) {
    next("/login");
  } else {
    next();
  }
}

export function roleGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  store: St
) {
  if (!store.isloggedIn) {
    next("/login");
  } else {
    next("/login");
  }
}
