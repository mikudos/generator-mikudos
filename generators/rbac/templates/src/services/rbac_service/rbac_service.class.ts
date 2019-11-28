import _ from 'lodash';
import { Application } from 'mikudos-node-app';

export default class {
    options: any;
    constructor(options?: any) {
        this.options = options || {};
    }

    private checkDefaultRoleRight(
        fullPathMethod: string,
        expStr: string
    ): boolean {
        let reg = new RegExp(expStr, 'i');
        let matched = fullPathMethod.match(reg);
        return !!matched && matched[0] === fullPathMethod;
    }

    async VerifyAccessRightWithRids(ctx: any) {
        const roleIds = ctx.req.ids;
        let method = ctx.req.fullPathMethod;
        if ((roleIds as [number]).includes(-1)) {
            // 超级角色
            return (ctx.res = { passed: true });
        } else if ((roleIds as [number]).includes(0)) {
            // 默认角色
            return (ctx.res = {
                passed: this.checkDefaultRoleRight(
                    method,
                    (ctx.app as Application).config.default_method_regex || '.*'
                )
            });
        }
        let pathArr = (method as string).split('.');
        let first = _.dropRight(pathArr, 2).join('.');
        pathArr = _.reverse(pathArr);
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

    async VerifyAccessRightWithGids(ctx: any) {
        const groupIds = ctx.req.ids;
        let method = ctx.req.fullPathMethod;
        if ((groupIds as [number]).includes(-1)) {
            // 超级用户
            return (ctx.res = { passed: true });
        } else if ((groupIds as [number]).includes(0)) {
            // 默认用户分组
            return (ctx.res = {
                passed: this.checkDefaultRoleRight(
                    method,
                    (ctx.app as Application).config.default_method_regex || '.*'
                )
            });
        }
        let pathArr = (method as string).split('.');
        let first = _.dropRight(pathArr, 2).join('.');
        pathArr = _.reverse(pathArr);
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
