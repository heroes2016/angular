import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { PromiseWrapper } from 'angular2/src/facade/promise';
import { Map } from 'angular2/src/facade/collection';
import { convertUrlParamsToArray } from '../url_parser';
import { ComponentInstruction } from '../instruction';
// RouteMatch objects hold information about a match between a rule and a URL
export class RouteMatch {
}
export class PathMatch extends RouteMatch {
    constructor(instruction, remaining, remainingAux) {
        super();
        this.instruction = instruction;
        this.remaining = remaining;
        this.remainingAux = remainingAux;
    }
}
export class RedirectMatch extends RouteMatch {
    constructor(redirectTo, specificity) {
        super();
        this.redirectTo = redirectTo;
        this.specificity = specificity;
    }
}
export class RedirectRule {
    constructor(_pathRecognizer, redirectTo) {
        this._pathRecognizer = _pathRecognizer;
        this.redirectTo = redirectTo;
        this.hash = this._pathRecognizer.hash;
    }
    get path() { return this._pathRecognizer.toString(); }
    set path(val) { throw new BaseException('you cannot set the path of a RedirectRule directly'); }
    /**
     * Returns `null` or a `ParsedUrl` representing the new path to match
     */
    recognize(beginningSegment) {
        var match = null;
        if (isPresent(this._pathRecognizer.matchUrl(beginningSegment))) {
            match = new RedirectMatch(this.redirectTo, this._pathRecognizer.specificity);
        }
        return PromiseWrapper.resolve(match);
    }
    generate(params) {
        throw new BaseException(`Tried to generate a redirect.`);
    }
}
// represents something like '/foo/:bar'
export class RouteRule {
    // TODO: cache component instruction instances by params and by ParsedUrl instance
    constructor(_routePath, handler, _routeName) {
        this._routePath = _routePath;
        this.handler = handler;
        this._routeName = _routeName;
        this._cache = new Map();
        this.specificity = this._routePath.specificity;
        this.hash = this._routePath.hash;
        this.terminal = this._routePath.terminal;
    }
    get path() { return this._routePath.toString(); }
    set path(val) { throw new BaseException('you cannot set the path of a RouteRule directly'); }
    recognize(beginningSegment) {
        var res = this._routePath.matchUrl(beginningSegment);
        if (isBlank(res)) {
            return null;
        }
        return this.handler.resolveComponentType().then((_) => {
            var componentInstruction = this._getInstruction(res.urlPath, res.urlParams, res.allParams);
            return new PathMatch(componentInstruction, res.rest, res.auxiliary);
        });
    }
    generate(params) {
        var generated = this._routePath.generateUrl(params);
        var urlPath = generated.urlPath;
        var urlParams = generated.urlParams;
        return this._getInstruction(urlPath, convertUrlParamsToArray(urlParams), params);
    }
    generateComponentPathValues(params) {
        return this._routePath.generateUrl(params);
    }
    _getInstruction(urlPath, urlParams, params) {
        if (isBlank(this.handler.componentType)) {
            throw new BaseException(`Tried to get instruction before the type was loaded.`);
        }
        var hashKey = urlPath + '?' + urlParams.join('&');
        if (this._cache.has(hashKey)) {
            return this._cache.get(hashKey);
        }
        var instruction = new ComponentInstruction(urlPath, urlParams, this.handler.data, this.handler.componentType, this.terminal, this.specificity, params, this._routeName);
        this._cache.set(hashKey, instruction);
        return instruction;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVVzM0YyMzFtLnRtcC9hbmd1bGFyMi9zcmMvcm91dGVyL3J1bGVzL3J1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBQyxNQUFNLDBCQUEwQjtPQUNwRCxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQztPQUNyRCxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QjtPQUNuRCxFQUFDLEdBQUcsRUFBQyxNQUFNLGdDQUFnQztPQUczQyxFQUFNLHVCQUF1QixFQUFDLE1BQU0sZUFBZTtPQUNuRCxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCO0FBS25ELDZFQUE2RTtBQUM3RTtBQUFrQyxDQUFDO0FBRW5DLCtCQUErQixVQUFVO0lBQ3ZDLFlBQW1CLFdBQWlDLEVBQVMsU0FBYyxFQUN4RCxZQUFtQjtRQUNwQyxPQUFPLENBQUM7UUFGUyxnQkFBVyxHQUFYLFdBQVcsQ0FBc0I7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQ3hELGlCQUFZLEdBQVosWUFBWSxDQUFPO0lBRXRDLENBQUM7QUFDSCxDQUFDO0FBRUQsbUNBQW1DLFVBQVU7SUFDM0MsWUFBbUIsVUFBaUIsRUFBUyxXQUFXO1FBQUksT0FBTyxDQUFDO1FBQWpELGVBQVUsR0FBVixVQUFVLENBQU87UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBQTtJQUFhLENBQUM7QUFDeEUsQ0FBQztBQVVEO0lBR0UsWUFBb0IsZUFBMEIsRUFBUyxVQUFpQjtRQUFwRCxvQkFBZSxHQUFmLGVBQWUsQ0FBVztRQUFTLGVBQVUsR0FBVixVQUFVLENBQU87UUFDdEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUks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QUFDLE1BQTRCO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sZUFBZSxDQUFDLE9BQWUsRUFBRSxTQUFtQixFQUNwQyxNQUE0QjtRQUNsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFDRCxJQUFJLE9BQU8sR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsSUFBSSxXQUFXLEdBQ1gsSUFBSSxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUNqRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDO0FBQ0gsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL3Byb21pc2UnO1xuaW1wb3J0IHtNYXB9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7Um91dGVIYW5kbGVyfSBmcm9tICcuL3JvdXRlX2hhbmRsZXJzL3JvdXRlX2hhbmRsZXInO1xuaW1wb3J0IHtVcmwsIGNvbnZlcnRVcmxQYXJhbXNUb0FycmF5fSBmcm9tICcuLi91cmxfcGFyc2VyJztcbmltcG9ydCB7Q29tcG9uZW50SW5zdHJ1Y3Rpb259IGZyb20gJy4uL2luc3RydWN0aW9uJztcbmltcG9ydCB7Um91dGVQYXRofSBmcm9tICcuL3JvdXRlX3BhdGhzL3JvdXRlX3BhdGgnO1xuaW1wb3J0IHtHZW5lcmF0ZWRVcmx9IGZyb20gJy4vcm91dGVfcGF0aHMvcm91dGVfcGF0aCc7XG5cblxuLy8gUm91dGVNYXRjaCBvYmplY3RzIGhvbGQgaW5mb3JtYXRpb24gYWJvdXQgYSBtYXRjaCBiZXR3ZWVuIGEgcnVsZSBhbmQgYSBVUkxcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSb3V0ZU1hdGNoIHt9XG5cbmV4cG9ydCBjbGFzcyBQYXRoTWF0Y2ggZXh0ZW5kcyBSb3V0ZU1hdGNoIHtcbiAgY29uc3RydWN0b3IocHVibGljIGluc3RydWN0aW9uOiBDb21wb25lbnRJbnN0cnVjdGlvbiwgcHVibGljIHJlbWFpbmluZzogVXJsLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVtYWluaW5nQXV4OiBVcmxbXSkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0TWF0Y2ggZXh0ZW5kcyBSb3V0ZU1hdGNoIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJlZGlyZWN0VG86IGFueVtdLCBwdWJsaWMgc3BlY2lmaWNpdHkpIHsgc3VwZXIoKTsgfVxufVxuXG4vLyBSdWxlcyBhcmUgcmVzcG9uc2libGUgZm9yIHJlY29nbml6aW5nIFVSTCBzZWdtZW50cyBhbmQgZ2VuZXJhdGluZyBpbnN0cnVjdGlvbnNcbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RSdWxlIHtcbiAgaGFzaDogc3RyaW5nO1xuICBwYXRoOiBzdHJpbmc7XG4gIHJlY29nbml6ZShiZWdpbm5pbmdTZWdtZW50OiBVcmwpOiBQcm9taXNlPFJvdXRlTWF0Y2g+O1xuICBnZW5lcmF0ZShwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcG9uZW50SW5zdHJ1Y3Rpb247XG59XG5cbmV4cG9ydCBjbGFzcyBSZWRpcmVjdFJ1bGUgaW1wbGVtZW50cyBBYnN0cmFjdFJ1bGUge1xuICBwdWJsaWMgaGFzaDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhdGhSZWNvZ25pemVyOiBSb3V0ZVBhdGgsIHB1YmxpYyByZWRpcmVjdFRvOiBhbnlbXSkge1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX3BhdGhSZWNvZ25pemVyLmhhc2g7XG4gIH1cblxuICBnZXQgcGF0aCgpIHsgcmV0dXJuIHRoaXMuX3BhdGhSZWNvZ25pemVyLnRvU3RyaW5nKCk7IH1cbiAgc2V0IHBhdGgodmFsKSB7IHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCd5b3UgY2Fubm90IHNldCB0aGUgcGF0aCBvZiBhIFJlZGlyZWN0UnVsZSBkaXJlY3RseScpOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYG51bGxgIG9yIGEgYFBhcnNlZFVybGAgcmVwcmVzZW50aW5nIHRoZSBuZXcgcGF0aCB0byBtYXRjaFxuICAgKi9cbiAgcmVjb2duaXplKGJlZ2lubmluZ1NlZ21lbnQ6IFVybCk6IFByb21pc2U8Um91dGVNYXRjaD4ge1xuICAgIHZhciBtYXRjaCA9IG51bGw7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wYXRoUmVjb2duaXplci5tYXRjaFVybChiZWdpbm5pbmdTZWdtZW50KSkpIHtcbiAgICAgIG1hdGNoID0gbmV3IFJlZGlyZWN0TWF0Y2godGhpcy5yZWRpcmVjdFRvLCB0aGlzLl9wYXRoUmVjb2duaXplci5zcGVjaWZpY2l0eSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKG1hdGNoKTtcbiAgfVxuXG4gIGdlbmVyYXRlKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21wb25lbnRJbnN0cnVjdGlvbiB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFRyaWVkIHRvIGdlbmVyYXRlIGEgcmVkaXJlY3QuYCk7XG4gIH1cbn1cblxuXG4vLyByZXByZXNlbnRzIHNvbWV0aGluZyBsaWtlICcvZm9vLzpiYXInXG5leHBvcnQgY2xhc3MgUm91dGVSdWxlIGltcGxlbWVudHMgQWJzdHJhY3RSdWxlIHtcbiAgc3BlY2lmaWNpdHk6IHN0cmluZztcbiAgdGVybWluYWw6IGJvb2xlYW47XG4gIGhhc2g6IHN0cmluZztcblxuICBwcml2YXRlIF9jYWNoZTogTWFwPHN0cmluZywgQ29tcG9uZW50SW5zdHJ1Y3Rpb24+ID0gbmV3IE1hcDxzdHJpbmcsIENvbXBvbmVudEluc3RydWN0aW9uPigpO1xuXG4gIC8vIFRPRE86IGNhY2hlIGNvbXBvbmVudCBpbnN0cnVjdGlvbiBpbnN0YW5jZXMgYnkgcGFyYW1zIGFuZCBieSBQYXJzZWRVcmwgaW5zdGFuY2VcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0ZVBhdGg6IFJvdXRlUGF0aCwgcHVibGljIGhhbmRsZXI6IFJvdXRlSGFuZGxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGVOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNwZWNpZmljaXR5ID0gdGhpcy5fcm91dGVQYXRoLnNwZWNpZmljaXR5O1xuICAgIHRoaXMuaGFzaCA9IHRoaXMuX3JvdXRlUGF0aC5oYXNoO1xuICAgIHRoaXMudGVybWluYWwgPSB0aGlzLl9yb3V0ZVBhdGgudGVybWluYWw7XG4gIH1cblxuICBnZXQgcGF0aCgpIHsgcmV0dXJuIHRoaXMuX3JvdXRlUGF0aC50b1N0cmluZygpOyB9XG4gIHNldCBwYXRoKHZhbCkgeyB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbigneW91IGNhbm5vdCBzZXQgdGhlIHBhdGggb2YgYSBSb3V0ZVJ1bGUgZGlyZWN0bHknKTsgfVxuXG4gIHJlY29nbml6ZShiZWdpbm5pbmdTZWdtZW50OiBVcmwpOiBQcm9taXNlPFJvdXRlTWF0Y2g+IHtcbiAgICB2YXIgcmVzID0gdGhpcy5fcm91dGVQYXRoLm1hdGNoVXJsKGJlZ2lubmluZ1NlZ21lbnQpO1xuICAgIGlmIChpc0JsYW5rKHJlcykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIucmVzb2x2ZUNvbXBvbmVudFR5cGUoKS50aGVuKChfKSA9PiB7XG4gICAgICB2YXIgY29tcG9uZW50SW5zdHJ1Y3Rpb24gPSB0aGlzLl9nZXRJbnN0cnVjdGlvbihyZXMudXJsUGF0aCwgcmVzLnVybFBhcmFtcywgcmVzLmFsbFBhcmFtcyk7XG4gICAgICByZXR1cm4gbmV3IFBhdGhNYXRjaChjb21wb25lbnRJbnN0cnVjdGlvbiwgcmVzLnJlc3QsIHJlcy5hdXhpbGlhcnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2VuZXJhdGUocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBvbmVudEluc3RydWN0aW9uIHtcbiAgICB2YXIgZ2VuZXJhdGVkID0gdGhpcy5fcm91dGVQYXRoLmdlbmVyYXRlVXJsKHBhcmFtcyk7XG4gICAgdmFyIHVybFBhdGggPSBnZW5lcmF0ZWQudXJsUGF0aDtcbiAgICB2YXIgdXJsUGFyYW1zID0gZ2VuZXJhdGVkLnVybFBhcmFtcztcbiAgICByZXR1cm4gdGhpcy5fZ2V0SW5zdHJ1Y3Rpb24odXJsUGF0aCwgY29udmVydFVybFBhcmFtc1RvQXJyYXkodXJsUGFyYW1zKSwgcGFyYW1zKTtcbiAgfVxuXG4gIGdlbmVyYXRlQ29tcG9uZW50UGF0aFZhbHVlcyhwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogR2VuZXJhdGVkVXJsIHtcbiAgICByZXR1cm4gdGhpcy5fcm91dGVQYXRoLmdlbmVyYXRlVXJsKHBhcmFtcyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRJbnN0cnVjdGlvbih1cmxQYXRoOiBzdHJpbmcsIHVybFBhcmFtczogc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21wb25lbnRJbnN0cnVjdGlvbiB7XG4gICAgaWYgKGlzQmxhbmsodGhpcy5oYW5kbGVyLmNvbXBvbmVudFR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVHJpZWQgdG8gZ2V0IGluc3RydWN0aW9uIGJlZm9yZSB0aGUgdHlwZSB3YXMgbG9hZGVkLmApO1xuICAgIH1cbiAgICB2YXIgaGFzaEtleSA9IHVybFBhdGggKyAnPycgKyB1cmxQYXJhbXMuam9pbignJicpO1xuICAgIGlmICh0aGlzLl9jYWNoZS5oYXMoaGFzaEtleSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5nZXQoaGFzaEtleSk7XG4gICAgfVxuICAgIHZhciBpbnN0cnVjdGlvbiA9XG4gICAgICAgIG5ldyBDb21wb25lbnRJbnN0cnVjdGlvbih1cmxQYXRoLCB1cmxQYXJhbXMsIHRoaXMuaGFuZGxlci5kYXRhLCB0aGlzLmhhbmRsZXIuY29tcG9uZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVybWluYWwsIHRoaXMuc3BlY2lmaWNpdHksIHBhcmFtcywgdGhpcy5fcm91dGVOYW1lKTtcbiAgICB0aGlzLl9jYWNoZS5zZXQoaGFzaEtleSwgaW5zdHJ1Y3Rpb24pO1xuXG4gICAgcmV0dXJuIGluc3RydWN0aW9uO1xuICB9XG59XG4iXX0=