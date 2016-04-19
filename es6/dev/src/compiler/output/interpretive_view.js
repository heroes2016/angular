import { isPresent } from 'angular2/src/facade/lang';
import { AppView } from 'angular2/src/core/linker/view';
import { BaseException } from 'angular2/src/facade/exceptions';
export class InterpretiveAppViewInstanceFactory {
    createInstance(superClass, clazz, args, props, getters, methods) {
        if (superClass === AppView) {
            return new _InterpretiveAppView(args, props, getters, methods);
        }
        throw new BaseException(`Can't instantiate class ${superClass} in interpretative mode`);
    }
}
class _InterpretiveAppView extends AppView {
    constructor(args, props, getters, methods) {
        super(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]);
        this.props = props;
        this.getters = getters;
        this.methods = methods;
    }
    createInternal(rootSelector) {
        var m = this.methods.get('createInternal');
        if (isPresent(m)) {
            m(rootSelector);
        }
        else {
            super.createInternal(rootSelector);
        }
    }
    injectorGetInternal(token, nodeIndex, notFoundResult) {
        var m = this.methods.get('injectorGetInternal');
        if (isPresent(m)) {
            return m(token, nodeIndex, notFoundResult);
        }
        else {
            return super.injectorGet(token, nodeIndex, notFoundResult);
        }
    }
    destroyInternal() {
        var m = this.methods.get('destroyInternal');
        if (isPresent(m)) {
            return m();
        }
        else {
            return super.destroyInternal();
        }
    }
    dirtyParentQueriesInternal() {
        var m = this.methods.get('dirtyParentQueriesInternal');
        if (isPresent(m)) {
            return m();
        }
        else {
            return super.dirtyParentQueriesInternal();
        }
    }
    detectChangesInternal(throwOnChange) {
        var m = this.methods.get('detectChangesInternal');
        if (isPresent(m)) {
            return m(throwOnChange);
        }
        else {
            return super.detectChangesInternal(throwOnChange);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJwcmV0aXZlX3ZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVVzM0YyMzFtLnRtcC9hbmd1bGFyMi9zcmMvY29tcGlsZXIvb3V0cHV0L2ludGVycHJldGl2ZV92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BQzNDLEVBQUMsT0FBTyxFQUFDLE1BQU0sK0JBQStCO09BQzlDLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDO0FBRzVEO0lBQ0UsY0FBYyxDQUFDLFVBQWUsRUFBRSxLQUFVLEVBQUUsSUFBVyxFQUFFLEtBQXVCLEVBQ2pFLE9BQThCLEVBQUUsT0FBOEI7UUFDM0UsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUNELE1BQU0sSUFBSSxhQUFhLENBQUMsMkJBQTJCLFVBQVUseUJBQXlCLENBQUMsQ0FBQztJQUMxRixDQUFDO0FBQ0gsQ0FBQztBQUVELG1DQUFtQyxPQUFPO0lBQ3hDLFlBQVksSUFBVyxFQUFTLEtBQXVCLEVBQVMsT0FBOEIsRUFDM0UsT0FBOEI7UUFDL0MsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ3hGLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBSGMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUF1QjtRQUMzRSxZQUFPLEdBQVAsT0FBTyxDQUF1QjtJQUdqRCxDQUFDO0lBQ0QsY0FBYyxDQUFDLFlBQW9CO1FBQ2pDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUNELG1CQUFtQixDQUFDLEtBQVUsRUFBRSxTQUFpQixFQUFFLGNBQW1CO1FBQ3BFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDaEQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM3RCxDQUFDO0lBQ0gsQ0FBQztJQUNELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNqQyxDQUFDO0lBQ0gsQ0FBQztJQUNELDBCQUEwQjtRQUN4QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0lBQ0QscUJBQXFCLENBQUMsYUFBc0I7UUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtBcHBWaWV3fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlldyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0luc3RhbmNlRmFjdG9yeSwgRHluYW1pY0luc3RhbmNlfSBmcm9tICcuL291dHB1dF9pbnRlcnByZXRlcic7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcnByZXRpdmVBcHBWaWV3SW5zdGFuY2VGYWN0b3J5IGltcGxlbWVudHMgSW5zdGFuY2VGYWN0b3J5IHtcbiAgY3JlYXRlSW5zdGFuY2Uoc3VwZXJDbGFzczogYW55LCBjbGF6ejogYW55LCBhcmdzOiBhbnlbXSwgcHJvcHM6IE1hcDxzdHJpbmcsIGFueT4sXG4gICAgICAgICAgICAgICAgIGdldHRlcnM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPiwgbWV0aG9kczogTWFwPHN0cmluZywgRnVuY3Rpb24+KTogYW55IHtcbiAgICBpZiAoc3VwZXJDbGFzcyA9PT0gQXBwVmlldykge1xuICAgICAgcmV0dXJuIG5ldyBfSW50ZXJwcmV0aXZlQXBwVmlldyhhcmdzLCBwcm9wcywgZ2V0dGVycywgbWV0aG9kcyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBDYW4ndCBpbnN0YW50aWF0ZSBjbGFzcyAke3N1cGVyQ2xhc3N9IGluIGludGVycHJldGF0aXZlIG1vZGVgKTtcbiAgfVxufVxuXG5jbGFzcyBfSW50ZXJwcmV0aXZlQXBwVmlldyBleHRlbmRzIEFwcFZpZXc8YW55PiBpbXBsZW1lbnRzIER5bmFtaWNJbnN0YW5jZSB7XG4gIGNvbnN0cnVjdG9yKGFyZ3M6IGFueVtdLCBwdWJsaWMgcHJvcHM6IE1hcDxzdHJpbmcsIGFueT4sIHB1YmxpYyBnZXR0ZXJzOiBNYXA8c3RyaW5nLCBGdW5jdGlvbj4sXG4gICAgICAgICAgICAgIHB1YmxpYyBtZXRob2RzOiBNYXA8c3RyaW5nLCBGdW5jdGlvbj4pIHtcbiAgICBzdXBlcihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdLCBhcmdzWzVdLCBhcmdzWzZdLCBhcmdzWzddLCBhcmdzWzhdLCBhcmdzWzldLFxuICAgICAgICAgIGFyZ3NbMTBdKTtcbiAgfVxuICBjcmVhdGVJbnRlcm5hbChyb290U2VsZWN0b3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHZhciBtID0gdGhpcy5tZXRob2RzLmdldCgnY3JlYXRlSW50ZXJuYWwnKTtcbiAgICBpZiAoaXNQcmVzZW50KG0pKSB7XG4gICAgICBtKHJvb3RTZWxlY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmNyZWF0ZUludGVybmFsKHJvb3RTZWxlY3Rvcik7XG4gICAgfVxuICB9XG4gIGluamVjdG9yR2V0SW50ZXJuYWwodG9rZW46IGFueSwgbm9kZUluZGV4OiBudW1iZXIsIG5vdEZvdW5kUmVzdWx0OiBhbnkpOiBhbnkge1xuICAgIHZhciBtID0gdGhpcy5tZXRob2RzLmdldCgnaW5qZWN0b3JHZXRJbnRlcm5hbCcpO1xuICAgIGlmIChpc1ByZXNlbnQobSkpIHtcbiAgICAgIHJldHVybiBtKHRva2VuLCBub2RlSW5kZXgsIG5vdEZvdW5kUmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLmluamVjdG9yR2V0KHRva2VuLCBub2RlSW5kZXgsIG5vdEZvdW5kUmVzdWx0KTtcbiAgICB9XG4gIH1cbiAgZGVzdHJveUludGVybmFsKCk6IHZvaWQge1xuICAgIHZhciBtID0gdGhpcy5tZXRob2RzLmdldCgnZGVzdHJveUludGVybmFsJyk7XG4gICAgaWYgKGlzUHJlc2VudChtKSkge1xuICAgICAgcmV0dXJuIG0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLmRlc3Ryb3lJbnRlcm5hbCgpO1xuICAgIH1cbiAgfVxuICBkaXJ0eVBhcmVudFF1ZXJpZXNJbnRlcm5hbCgpOiB2b2lkIHtcbiAgICB2YXIgbSA9IHRoaXMubWV0aG9kcy5nZXQoJ2RpcnR5UGFyZW50UXVlcmllc0ludGVybmFsJyk7XG4gICAgaWYgKGlzUHJlc2VudChtKSkge1xuICAgICAgcmV0dXJuIG0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLmRpcnR5UGFyZW50UXVlcmllc0ludGVybmFsKCk7XG4gICAgfVxuICB9XG4gIGRldGVjdENoYW5nZXNJbnRlcm5hbCh0aHJvd09uQ2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdmFyIG0gPSB0aGlzLm1ldGhvZHMuZ2V0KCdkZXRlY3RDaGFuZ2VzSW50ZXJuYWwnKTtcbiAgICBpZiAoaXNQcmVzZW50KG0pKSB7XG4gICAgICByZXR1cm4gbSh0aHJvd09uQ2hhbmdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLmRldGVjdENoYW5nZXNJbnRlcm5hbCh0aHJvd09uQ2hhbmdlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==