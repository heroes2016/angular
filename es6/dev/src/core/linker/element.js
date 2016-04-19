import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { ListWrapper } from 'angular2/src/facade/collection';
import { BaseException } from 'angular2/src/facade/exceptions';
import { ViewType } from './view_type';
import { ElementRef_ } from './element_ref';
import { ViewContainerRef_ } from './view_container_ref';
export class AppElement {
    constructor(index, parentIndex, parentView, nativeElement) {
        this.index = index;
        this.parentIndex = parentIndex;
        this.parentView = parentView;
        this.nativeElement = nativeElement;
        this.nestedViews = null;
        this.componentView = null;
    }
    get ref() {
        if (isBlank(this._ref)) {
            this._ref = new ElementRef_(this);
        }
        return this._ref;
    }
    get vcRef() {
        if (isBlank(this._vcRef)) {
            this._vcRef = new ViewContainerRef_(this);
        }
        return this._vcRef;
    }
    initComponent(component, componentConstructorViewQueries, view) {
        this.component = component;
        this.componentConstructorViewQueries = componentConstructorViewQueries;
        this.componentView = view;
    }
    get parentInjector() { return this.parentView.injector(this.parentIndex); }
    get injector() { return this.parentView.injector(this.index); }
    mapNestedViews(nestedViewClass, callback) {
        var result = [];
        if (isPresent(this.nestedViews)) {
            this.nestedViews.forEach((nestedView) => {
                if (nestedView.clazz === nestedViewClass) {
                    result.push(callback(nestedView));
                }
            });
        }
        return result;
    }
    attachView(view, viewIndex) {
        if (view.type === ViewType.COMPONENT) {
            throw new BaseException(`Component views can't be moved!`);
        }
        var nestedViews = this.nestedViews;
        if (nestedViews == null) {
            nestedViews = [];
            this.nestedViews = nestedViews;
        }
        ListWrapper.insert(nestedViews, viewIndex, view);
        var refRenderNode;
        if (viewIndex > 0) {
            var prevView = nestedViews[viewIndex - 1];
            refRenderNode = prevView.lastRootNode;
        }
        else {
            refRenderNode = this.nativeElement;
        }
        if (isPresent(refRenderNode)) {
            view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
        }
        this.parentView.addRenderContentChild(view);
    }
    detachView(viewIndex) {
        var view = ListWrapper.removeAt(this.nestedViews, viewIndex);
        if (view.type === ViewType.COMPONENT) {
            throw new BaseException(`Component views can't be moved!`);
        }
        view.renderer.detachView(view.flatRootNodes);
        view.renderParent.removeContentChild(view);
        return view;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtVXMzRjIzMW0udG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBTyxNQUFNLDBCQUEwQjtPQUMxRCxFQUFDLFdBQVcsRUFBQyxNQUFNLGdDQUFnQztPQUNuRCxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQztPQUtyRCxFQUFDLFFBQVEsRUFBQyxNQUFNLGFBQWE7T0FDN0IsRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlO09BRWxDLEVBQW1CLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCO0FBSXhFO0lBU0UsWUFBbUIsS0FBYSxFQUFTLFdBQW1CLEVBQVMsVUFBd0IsRUFDMUUsYUFBa0I7UUFEbEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQUMxRSxrQkFBYSxHQUFiLGFBQWEsQ0FBSztRQVQ5QixnQkFBVyxHQUFtQixJQUFJLENBQUM7UUFDbkMsa0JBQWEsR0FBaUIsSUFBSSxDQUFDO0lBUUYsQ0FBQztJQUV6QyxJQUFJLEdBQUc7UUFDTCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sR0FB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QyxDQUFDLENBQUM7WUFDckMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUM7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG5pbXBvcnQge0FwcFZpZXd9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge1ZpZXdUeXBlfSBmcm9tICcuL3ZpZXdfdHlwZSc7XG5pbXBvcnQge0VsZW1lbnRSZWZffSBmcm9tICcuL2VsZW1lbnRfcmVmJztcblxuaW1wb3J0IHtWaWV3Q29udGFpbmVyUmVmLCBWaWV3Q29udGFpbmVyUmVmX30gZnJvbSAnLi92aWV3X2NvbnRhaW5lcl9yZWYnO1xuXG5pbXBvcnQge1F1ZXJ5TGlzdH0gZnJvbSAnLi9xdWVyeV9saXN0JztcblxuZXhwb3J0IGNsYXNzIEFwcEVsZW1lbnQge1xuICBwdWJsaWMgbmVzdGVkVmlld3M6IEFwcFZpZXc8YW55PltdID0gbnVsbDtcbiAgcHVibGljIGNvbXBvbmVudFZpZXc6IEFwcFZpZXc8YW55PiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfcmVmOiBFbGVtZW50UmVmXztcbiAgcHJpdmF0ZSBfdmNSZWY6IFZpZXdDb250YWluZXJSZWZfO1xuICBwdWJsaWMgY29tcG9uZW50OiBhbnk7XG4gIHB1YmxpYyBjb21wb25lbnRDb25zdHJ1Y3RvclZpZXdRdWVyaWVzOiBRdWVyeUxpc3Q8YW55PltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbmRleDogbnVtYmVyLCBwdWJsaWMgcGFyZW50SW5kZXg6IG51bWJlciwgcHVibGljIHBhcmVudFZpZXc6IEFwcFZpZXc8YW55PixcbiAgICAgICAgICAgICAgcHVibGljIG5hdGl2ZUVsZW1lbnQ6IGFueSkge31cblxuICBnZXQgcmVmKCk6IEVsZW1lbnRSZWZfIHtcbiAgICBpZiAoaXNCbGFuayh0aGlzLl9yZWYpKSB7XG4gICAgICB0aGlzLl9yZWYgPSBuZXcgRWxlbWVudFJlZl8odGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yZWY7XG4gIH1cblxuICBnZXQgdmNSZWYoKTogVmlld0NvbnRhaW5lclJlZl8ge1xuICAgIGlmIChpc0JsYW5rKHRoaXMuX3ZjUmVmKSkge1xuICAgICAgdGhpcy5fdmNSZWYgPSBuZXcgVmlld0NvbnRhaW5lclJlZl8odGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl92Y1JlZjtcbiAgfVxuXG4gIGluaXRDb21wb25lbnQoY29tcG9uZW50OiBhbnksIGNvbXBvbmVudENvbnN0cnVjdG9yVmlld1F1ZXJpZXM6IFF1ZXJ5TGlzdDxhbnk+W10sXG4gICAgICAgICAgICAgICAgdmlldzogQXBwVmlldzxhbnk+KSB7XG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgdGhpcy5jb21wb25lbnRDb25zdHJ1Y3RvclZpZXdRdWVyaWVzID0gY29tcG9uZW50Q29uc3RydWN0b3JWaWV3UXVlcmllcztcbiAgICB0aGlzLmNvbXBvbmVudFZpZXcgPSB2aWV3O1xuICB9XG5cbiAgZ2V0IHBhcmVudEluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIHRoaXMucGFyZW50Vmlldy5pbmplY3Rvcih0aGlzLnBhcmVudEluZGV4KTsgfVxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gdGhpcy5wYXJlbnRWaWV3LmluamVjdG9yKHRoaXMuaW5kZXgpOyB9XG5cbiAgbWFwTmVzdGVkVmlld3MobmVzdGVkVmlld0NsYXNzOiBhbnksIGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueVtdIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLm5lc3RlZFZpZXdzKSkge1xuICAgICAgdGhpcy5uZXN0ZWRWaWV3cy5mb3JFYWNoKChuZXN0ZWRWaWV3KSA9PiB7XG4gICAgICAgIGlmIChuZXN0ZWRWaWV3LmNsYXp6ID09PSBuZXN0ZWRWaWV3Q2xhc3MpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChjYWxsYmFjayhuZXN0ZWRWaWV3KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICBhdHRhY2hWaWV3KHZpZXc6IEFwcFZpZXc8YW55Piwgdmlld0luZGV4OiBudW1iZXIpIHtcbiAgICBpZiAodmlldy50eXBlID09PSBWaWV3VHlwZS5DT01QT05FTlQpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBDb21wb25lbnQgdmlld3MgY2FuJ3QgYmUgbW92ZWQhYCk7XG4gICAgfVxuICAgIHZhciBuZXN0ZWRWaWV3cyA9IHRoaXMubmVzdGVkVmlld3M7XG4gICAgaWYgKG5lc3RlZFZpZXdzID09IG51bGwpIHtcbiAgICAgIG5lc3RlZFZpZXdzID0gW107XG4gICAgICB0aGlzLm5lc3RlZFZpZXdzID0gbmVzdGVkVmlld3M7XG4gICAgfVxuICAgIExpc3RXcmFwcGVyLmluc2VydChuZXN0ZWRWaWV3cywgdmlld0luZGV4LCB2aWV3KTtcbiAgICB2YXIgcmVmUmVuZGVyTm9kZTtcbiAgICBpZiAodmlld0luZGV4ID4gMCkge1xuICAgICAgdmFyIHByZXZWaWV3ID0gbmVzdGVkVmlld3Nbdmlld0luZGV4IC0gMV07XG4gICAgICByZWZSZW5kZXJOb2RlID0gcHJldlZpZXcubGFzdFJvb3ROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWZSZW5kZXJOb2RlID0gdGhpcy5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KHJlZlJlbmRlck5vZGUpKSB7XG4gICAgICB2aWV3LnJlbmRlcmVyLmF0dGFjaFZpZXdBZnRlcihyZWZSZW5kZXJOb2RlLCB2aWV3LmZsYXRSb290Tm9kZXMpO1xuICAgIH1cbiAgICB0aGlzLnBhcmVudFZpZXcuYWRkUmVuZGVyQ29udGVudENoaWxkKHZpZXcpO1xuICB9XG5cbiAgZGV0YWNoVmlldyh2aWV3SW5kZXg6IG51bWJlcik6IEFwcFZpZXc8YW55PiB7XG4gICAgdmFyIHZpZXcgPSBMaXN0V3JhcHBlci5yZW1vdmVBdCh0aGlzLm5lc3RlZFZpZXdzLCB2aWV3SW5kZXgpO1xuICAgIGlmICh2aWV3LnR5cGUgPT09IFZpZXdUeXBlLkNPTVBPTkVOVCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENvbXBvbmVudCB2aWV3cyBjYW4ndCBiZSBtb3ZlZCFgKTtcbiAgICB9XG5cbiAgICB2aWV3LnJlbmRlcmVyLmRldGFjaFZpZXcodmlldy5mbGF0Um9vdE5vZGVzKTtcblxuICAgIHZpZXcucmVuZGVyUGFyZW50LnJlbW92ZUNvbnRlbnRDaGlsZCh2aWV3KTtcbiAgICByZXR1cm4gdmlldztcbiAgfVxufVxuIl19