import cdkoutput from '../../cdk-output.json';

export function getGrapQLStackSettings() {
    for (const [key, value] of Object.entries(cdkoutput)) {
        if (key.includes('GraphQLApiStack')) {
            return value;
        }
    }
}
