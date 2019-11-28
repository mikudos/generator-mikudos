import _ from 'lodash';

export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

    async VerifyAccessRightWithRids(ctx: any) {
        let method = ctx.req.fullPathMethod;
        let pathArr = (method as string).split('.');
        let first = _.dropRight(pathArr, 2).join('.');
        pathArr = _.reverse(pathArr);
        const roleIds = ctx.req.ids;
        const sequelizeClient = ctx.app.get('sequelizeClient');
        method = (method as string).replace(/\*/g, '%');
        let res = await sequelizeClient.query(
            `SELECT COUNT(*) as matched FROM \`role_methods\` WHERE roleId in (${roleIds.toString()}) AND (role_methods.value = '*' OR role_methods.value = '*.*' OR role_methods.value = '*.*.*' OR role_methods.value = '${first}.*' OR role_methods.value = '${first}.*.*' OR role_methods.value = '${first}.${
                pathArr[1]
            }.*' OR role_methods.value = '${first}.*.${
                pathArr[0]
            }' OR role_methods.value = '*.${pathArr[1]}.${
                pathArr[0]
            }' OR role_methods.value = '*.${
                pathArr[1]
            }.*' OR role_methods.value = '*.*.${
                pathArr[0]
            }' OR role_methods.value = '${method}')`,
            {
                type: sequelizeClient.QueryTypes.SELECT
            }
        );

        ctx.res = { passed: !!res[0].matched };
    }

    // TODO:
    async VerifyAccessRightWithGids(ctx: any) {
        let method = ctx.req.fullPathMethod;
        let pathArr = (method as string).split('.');
        let first = _.dropRight(pathArr, 2).join('.');
        pathArr = _.reverse(pathArr);
        const groupIds = ctx.req.ids;
        const sequelizeClient = ctx.app.get('sequelizeClient');
        let res = await sequelizeClient.query(
            `SELECT COUNT(*) as matched FROM \`role_methods\` INNER JOIN \`groups\` WHERE role_methods.roleId IN (groups.rids) AND groups.id IN (${groupIds.toString()}) AND (role_methods.value = '*' OR role_methods.value = '*.*' OR role_methods.value = '*.*.*' OR role_methods.value = '${first}.*' OR role_methods.value = '${first}.*.*' OR role_methods.value = '${first}.${
                pathArr[1]
            }.*' OR role_methods.value = '${first}.*.${
                pathArr[0]
            }' OR role_methods.value = '*.${
                pathArr[1]
            }.*' OR role_methods.value = '*.${pathArr[1]}.${
                pathArr[0]
            }' OR role_methods.value = '*.*.${
                pathArr[0]
            }' OR role_methods.value = '${method}')`,
            {
                type: sequelizeClient.QueryTypes.SELECT
            }
        );

        ctx.res = { passed: !!res[0].matched };
    }
}
