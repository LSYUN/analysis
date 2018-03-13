/**
 * Created by a on 2016/9/30.
 */
// window.session.getObj(window.sessionKeys.ACCOUNT);
// window.session.getObj(window.sessionKeys.PERMISSION);
const accountType = (Vue) => {
  Vue.directive('account-type', {
    update: function (value) {
      const account = window.session.getObj(window.sessionKeys.ACCOUNT);
      // const perm = account.permissionType;
      // // console.log("account: " + perm);
      // if ((perm & parseInt(value, 2)) !== perm) {
      //   $(this.el).remove();
      // }
    }
  });
};
const organizationType = (Vue) => {
  Vue.directive('organization-type', {
    update: function (value) {
      // var organization = window.session.getObj(window.sessionKeys.ORGANIZATION);
      // var roleId = 1;
      // if (organization) roleId = organization.parsedRoleId;
      // // console.log("organization: " + roleId);
      // if ((roleId & parseInt(value, 2)) !== roleId) {
      //   $(this.el).remove();
      // }
    }
  });
};
export default {accountType,organizationType};
