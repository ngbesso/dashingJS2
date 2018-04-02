import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Dashingjs2GridsterItem } from './interfaces/dashingjs2-gridster-item';
import { WidgetHostDirective } from './widget-host.directive';
import { HelloWorldComponent } from './widgets/hello-world/hello-world.component';

@Component({
  selector: 'app-widget-container',
  template: `<ng-template [appWidgetHost]="data"></ng-template>`
})
export class WidgetContainerComponent implements OnInit {
  @Input() data: Dashingjs2GridsterItem;
  @ViewChild(WidgetHostDirective) widgetHostDirective: WidgetHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  private injectComponent(): void {
    if (this.data.widget.component === null) {
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.widget.component);
    const componentRef = this.widgetHostDirective.viewContainerRef.createComponent(componentFactory);
    (<Dashingjs2GridsterItem>componentRef.instance).data = this.data;
  }

  ngOnInit() {
    this.injectComponent();
  }
}
