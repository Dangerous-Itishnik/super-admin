import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://inctagram.work/api/v1/graphql',
    documents: 'src/graphql/**/*.graphql',
    generates: {
        'src/generated/graphql.tsx': {
            plugins: ['typescript', 'typescript-operations', "typescript-react-apollo"],
            "config": {
                "withHooks": true
            }
        }

    },
    ignoreNoDocuments: true,

}

module.exports = config;