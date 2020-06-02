"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// This is the way all CDK packages are imported.
const CDK = __importStar(require("@aws-cdk/core"));
const env_1 = require("./env");
const app = new CDK.App();
class E2EStack extends CDK.Stack {
    constructor(parent, id) {
        super(parent, id, {
            tags: { aTag: 'avalue' },
        });
    }
}
class PermanentResources extends CDK.Stack {
    constructor(parent, id) {
        super(parent, id, {
            tags: { aTag: 'avalue' },
        });
    }
}
const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
new E2EStack(app, `TestStack${capitalize(env_1.env)}`);
new PermanentResources(app, `Resources${capitalize(env_1.env)}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGlEQUFpRDtBQUNqRCxtREFBcUM7QUFDckMsK0JBQTRCO0FBRTVCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQU0sUUFBUyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzVCLFlBQW1CLE1BQWUsRUFBRSxFQUFVO1FBQzFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ2QsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQztTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFFRCxNQUFNLGtCQUFtQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3RDLFlBQW1CLE1BQWUsRUFBRSxFQUFVO1FBQzFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ2QsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQztTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFO0lBQzdCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pELENBQUMsQ0FBQTtBQUVELElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxZQUFZLFVBQVUsQ0FBQyxTQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakQsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsWUFBWSxVQUFVLENBQUMsU0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBpcyB0aGUgd2F5IGFsbCBDREsgcGFja2FnZXMgYXJlIGltcG9ydGVkLlxuaW1wb3J0ICogYXMgQ0RLIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgZW52IH0gZnJvbSAnLi9lbnYnO1xuXG5jb25zdCBhcHAgPSBuZXcgQ0RLLkFwcCgpO1xuXG5jbGFzcyBFMkVTdGFjayBleHRlbmRzIENESy5TdGFjayB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudDogQ0RLLkFwcCwgaWQ6IHN0cmluZykge1xuICAgICAgICBzdXBlcihwYXJlbnQsIGlkLCB7XG4gICAgICAgICAgICB0YWdzOiB7YVRhZzogJ2F2YWx1ZSd9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIFBlcm1hbmVudFJlc291cmNlcyBleHRlbmRzIENESy5TdGFjayB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudDogQ0RLLkFwcCwgaWQ6IHN0cmluZykge1xuICAgICAgICBzdXBlcihwYXJlbnQsIGlkLCB7XG4gICAgICAgICAgICB0YWdzOiB7YVRhZzogJ2F2YWx1ZSd9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IGNhcGl0YWxpemUgPSAoczogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpXG59XG5cbm5ldyBFMkVTdGFjayhhcHAsIGBUZXN0U3RhY2ske2NhcGl0YWxpemUoZW52KX1gKTtcbm5ldyBQZXJtYW5lbnRSZXNvdXJjZXMoYXBwLCBgUmVzb3VyY2VzJHtjYXBpdGFsaXplKGVudil9YCk7Il19