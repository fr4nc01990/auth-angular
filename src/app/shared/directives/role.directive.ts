// src/app/shared/directives/role.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Directive({
  selector: '[appRole]',
  standalone: true,
})
export class RoleDirective {
  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appRole(roles: string[]) {
    const userRole = this.authService.getUserRole();
    if (userRole && roles?.includes(userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
