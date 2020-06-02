// This is the way all CDK packages are imported.
import * as CDK from '@aws-cdk/core';
import { env } from './env';

const app = new CDK.App();

class E2EStack extends CDK.Stack {
    public constructor(parent: CDK.App, id: string) {
        super(parent, id, {
            tags: {aTag: 'avalue'},
        });
    }
}

class PermanentResources extends CDK.Stack {
    public constructor(parent: CDK.App, id: string) {
        super(parent, id, {
            tags: {aTag: 'avalue'},
        });
    }
}

const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

new E2EStack(app, `TestStack${capitalize(env)}`);
new PermanentResources(app, `Resources${capitalize(env)}`);