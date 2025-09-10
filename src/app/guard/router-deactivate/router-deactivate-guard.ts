import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmPopup } from "../../component/confirm-popup/confirm-popup";
import { map } from "rxjs";

export const routerDeactivateGuard: CanDeactivateFn<unknown> = (
  component : unknown,
  currentRoute : ActivatedRouteSnapshot,
  currentState : RouterStateSnapshot,
  nextState: RouterStateSnapshot
) => {
  if(component && (component as any)?.hasUserChanges?.()){
    const matDialog : MatDialog = inject(MatDialog);
    const dialogRef = matDialog.open(ConfirmPopup, {
      data: {
        message: "Are you sure you want to leave this page?"
      },
      width: "300px",
      height: "200px",
      position: {
        top: "50%",
        left: "50%", 
      }
    });
    return dialogRef.afterClosed().pipe(
      map((result: boolean) => {
        return result;
      })
    );
  }
  return true;
};
