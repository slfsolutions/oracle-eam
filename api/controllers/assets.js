const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'asst.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'asset_type_code', column: {expression: 'asst.asset_type_code'}},
  {name: 'asset_type', column: {expression: 'asst.asset_type'}},
  {name: 'asset_id', column: {expression: 'asst.asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', column: {expression: 'asst.asset_number'}},
  {name: 'description', column: {expression: 'asst.description'}},
  {name: 'asset_group_id', column: {expression: 'asst.asset_group_id', type: oracledb.NUMBER}},
  {name: 'asset_group', column: {expression: 'asgr.asset_group'}},
  {name: 'asset_group_description', column: {expression: 'asgr.description'}},
  {name: 'serial_number', column: {expression: 'asst.serial_number'}},
  {name: 'asset_object_id', column: {expression: 'asst.asset_object_id', type: oracledb.NUMBER}},
  {name: 'category_id', column: {expression: 'asst.category_id', type: oracledb.NUMBER}},
  {name: 'category', column: {expression: 'asca.category'}},
  {name: 'category_class', column: {expression: 'asca.class'}},
  {name: 'category_subclass', column: {expression: 'asca.subclass'}},
  {name: 'category_description', column: {expression: 'asca.description'}},
  {name: 'owning_department_id', column: {expression: 'asst.owning_department_id', type: oracledb.NUMBER}},
  {name: 'owning_department', column: {expression: 'dept.department'}},
  {name: 'owning_department_description', column: {expression: 'dept.description'}},
  {name: 'criticality_code', column: {expression: 'asst.criticality_code'}},
  {name: 'criticality', column: {expression: 'asst.criticality'}},
  {name: 'wip_accounting_class', column: {expression: 'asst.wip_accounting_class'}},
  {name: 'status_id', column: {expression: 'asst.status_id', type: oracledb.NUMBER}},
  {name: 'status', column: {expression: 'asst.status'}},
  {name: 'area_id', column: {expression: 'asst.area_id', type: oracledb.NUMBER}},
  {name: 'area', column: {expression: 'asar.area'}},
  {name: 'area_description', column: {expression: 'asar.description'}},
  {name: 'maintainable_flag', column: {expression: 'asst.maintainable_flag'}},
  {name: 'active_start_date', column: {expression: 'asst.active_start_date', type: oracledb.DATE}},
  {name: 'active_end_date', column: {expression: 'asst.active_end_date', type: oracledb.DATE}},
  {name: 'active_flag', column: {expression: 'asst.active_flag'}},
  {name: 'linear_asset_flag', column: {expression: 'asst.linear_asset_flag'}},
  {name: 'operation_log_enabled_flag', column: {expression: 'asst.operation_log_enabled_flag'}},
  {name: 'warranty_expiration_date', column: {expression: 'asst.warranty_expiration_date', type: oracledb.DATE}},
  {name: 'checkin_status_code', column: {expression: 'asst.checkin_status_code'}},
  {name: 'checked_out_flag', column: {expression: 'asst.checked_out_flag'}},
  {name: 'parent_asset_object_id', column: {expression: 'asst.parent_asset_object_id', type: oracledb.NUMBER}},
  {name: 'parent_asset_id', column: {expression: 'asst.parent_asset_id', type: oracledb.NUMBER}},
  {name: 'parent_asset_number', column: {expression: 'asst_p.asset_number'}},
  {name: 'parent_asset_description', column: {expression: 'asst_p.description'}},
  {name: 'parent_asset_type_code', column: {expression: 'asst_p.asset_type_code'}},
  {name: 'parent_asset_type', column: {expression: 'asst_p.asset_type'}},
  {name: 'parent_asset_group_id', column: {expression: 'asst_p.asset_group_id', type: oracledb.NUMBER}},
  {name: 'parent_asset_group', column: {expression: 'asgr_p.asset_group'}},
  {name: 'parent_asset_group_description', column: {expression: 'asgr_p.description'}},
  {name: 'location_type_code', column: {expression: 'asst.location_type_code'}},
  {name: 'location_id', column: {expression: 'asst.location_id', type: oracledb.NUMBER}},
  {name: 'location_code', column: {expression: 'asst.location_code'}},
  {name: 'location_address', column: {expression: 'asst.location_address'}},
  {name: 'prod_equip_object_id', column: {expression: 'asst.prod_equip_object_id', type: oracledb.NUMBER}},
  {name: 'prod_equip_organization_id', column: {expression: 'asst.prod_equip_organization_id', type: oracledb.NUMBER}},
  {name: 'prod_equip_item_id', column: {expression: 'asst.prod_equip_item_id', type: oracledb.NUMBER}},
  {name: 'prod_equip_serial_number', column: {expression: 'asst.prod_equip_serial_number'}},
  {name: 'fixed_asset_id', column: {expression: 'asst.fixed_asset_id', type: oracledb.NUMBER}},
  {name: 'fixed_asset_category_id', column: {expression: 'asst.fixed_asset_category_id', type: oracledb.NUMBER}},
  {name: 'fixed_asset_major_category', column: {expression: 'asst.fixed_asset_major_category'}},
  {name: 'fixed_asset_minor_category', column: {expression: 'asst.fixed_asset_minor_category'}},
  {name: 'fixed_asset_number', column: {expression: 'asst.fixed_asset_number'}},
  {name: 'fixed_asset_synchronized_flag', column: {expression: 'asst.fixed_asset_synchronized_flag'}},
  {name: 'latitude', column: {expression: 'asst.latitude', type: oracledb.NUMBER}},
  {name: 'latitude_degrees', column: {expression: 'asst.latitude_degrees', type: oracledb.NUMBER}},
  {name: 'latitude_minutes', column: {expression: 'asst.latitude_minutes', type: oracledb.NUMBER}},
  {name: 'latitude_seconds', column: {expression: 'asst.latitude_seconds', type: oracledb.NUMBER}},
  {name: 'latitude_direction', column: {expression: 'asst.latitude_direction'}},
  {name: 'longitude', column: {expression: 'asst.longitude', type: oracledb.NUMBER}},
  {name: 'longitude_degrees', column: {expression: 'asst.longitude_degrees', type: oracledb.NUMBER}},
  {name: 'longitude_minutes', column: {expression: 'asst.longitude_minutes', type: oracledb.NUMBER}},
  {name: 'longitude_seconds', column: {expression: 'asst.longitude_seconds', type: oracledb.NUMBER}},
  {name: 'longitude_direction', column: {expression: 'asst.longitude_direction'}},
  {name: 'safety_type_code', column: {expression: 'asst.safety_type_code'}},
  {name: 'safety_type', column: {expression: 'asst.safety_type'}},
  {name: 'safety_operating_position_code', column: {expression: 'asst.safety_operating_position_code'}},
  {name: 'safety_operating_position', column: {expression: 'asst.safety_operating_position'}},
  {name: 'safety_operating_tag_code', column: {expression: 'asst.safety_operating_tag_code'}},
  {name: 'safety_operating_tag', column: {expression: 'asst.safety_operating_tag'}},
  {name: 'safety_shutdown_position_code', column: {expression: 'asst.safety_shutdown_position_code'}},
  {name: 'safety_shutdown_position', column: {expression: 'asst.safety_shutdown_position'}},
  {name: 'safety_shutdown_tag_code', column: {expression: 'asst.safety_shutdown_tag_code'}},
  {name: 'safety_shutdown_tag', column: {expression: 'asst.safety_shutdown_tag'}},
  {name: 'safety_lockout_device_code', column: {expression: 'asst.safety_lockout_device_code'}},
  {name: 'safety_lockout_device', column: {expression: 'asst.safety_lockout_device'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_assets_v asst\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asst.organization_id\n' +
  '         JOIN apps.xeam_asset_groups_v asgr ON asgr.organization_id = asst.organization_id AND asgr.asset_group_id = asst.asset_group_id\n' +
  '         LEFT JOIN apps.xeam_asset_categories_v asca ON asca.category_id = asst.category_id\n' +
  '         LEFT JOIN apps.xeam_departments_v dept ON dept.department_id = asst.owning_department_id\n' +
  '         LEFT JOIN apps.xeam_asset_areas_v asar ON asar.area_id = asst.area_id\n' +
  '         LEFT JOIN apps.xeam_assets_v asst_p ON asst_p.asset_id = asst.parent_asset_id\n' +
  '         LEFT JOIN apps.xeam_asset_groups_v asgr_p ON asgr_p.organization_id = asst_p.organization_id AND asgr_p.asset_group_id = asst_p.asset_group_id\n' +
  ' WHERE   NVL(asst.network_asset_flag, \'N\') = \'N\'\n';

const fromClauseWithKey = fromClause +
  ' AND     asst.asset_id = :asset_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    asset_id: parseInt(request.params.asset_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */

module.exports.create = function(request, response, next) {
  const statement = {
    sql:
      ' BEGIN\n' +
      '   apps.xeam_asset_pkg.process_asset(\n' +
      '     p_user_id => null\n' +
      '   , p_transaction_type => \'CREATE\'\n' +
      '   , x_return_status => :return_status\n' +
      '   , x_msg_data => :msg_data\n' +
      '   , p_organization_id => :organization_id\n' +
      '   , x_asset_id => :asset_id\n' +
      '   , p_asset_number => :asset_number\n' +
      '   , p_description => :description\n' +
      '   , p_asset_group_id => :asset_group_id\n' +
      '   , p_serial_number => :serial_number\n' +
      '   , p_category_id => :category_id\n' +
      '   , p_owning_department_id => :owning_department_id\n' +
      '   , p_criticality_code => :criticality_code\n' +
      '   , p_wip_accounting_class_code => :wip_accounting_class_code\n' +
      '   , p_status_id => :status_id\n' +
      '   , p_area_id => :area_id\n' +
      '   , p_maintainable_flag => :maintainable_flag\n' +
      '   , p_operation_log_enabled_flag => :operation_log_enabled_flag\n' +
      '   , p_warranty_expiration_date => :warranty_expiration_date\n' +
      '   , p_checked_out_flag => :checked_out_flag\n' +
      '   , p_parent_asset_id => :parent_asset_id\n' +
      '   , p_location_id => :location_id\n' +
      '   , p_prod_equip_object_id => :prod_equip_object_id\n' +
      '   , p_fixed_asset_id => :fixed_asset_id\n' +
      '   , p_fixed_asset_synch_flag => :fixed_asset_synchronize_flag\n' +
      '   );\n' +
      ' END;\n',
    bindParams: {
      return_status: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
      msg_data: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
      organization_id: request.body.organization_id || null,
      asset_id: {dir: oracledb.BIND_INOUT, type: oracledb.NUMBER},
      asset_number: request.body.asset_number || null,
      description: request.body.description || null,
      asset_group_id: request.body.asset_group_id || null,
      serial_number: request.body.serial_number || null,
      category_id: request.body.category_id || null,
      owning_department_id: request.body.owning_department_id || null,
      criticality_code: request.body.criticality_code || null,
      wip_accounting_class_code: request.body.wip_accounting_class_code || null,
      status_id: request.body.status_id || null,
      area_id: request.body.area_id || null,
      maintainable_flag: request.body.maintainable_flag || null,
      operation_log_enabled_flag: request.body.operation_log_enabled_flag || null,
      warranty_expiration_date: request.body.warranty_expiration_date || null,
      checked_out_flag: request.body.checked_out_flag || null,
      parent_asset_id: request.body.parent_asset_id || null,
      location_id: request.body.location_id || null,
      prod_equip_object_id: request.body.prod_equip_object_id || null,
      fixed_asset_id: request.body.fixed_asset_id || null,
      fixed_asset_synchronize_flag: request.body.fixed_asset_synchronize_flag || null
    },
    options: {}
  };
  const getKeys = function(initial, result) {
    return {
      asset_id: result.asset_id
    };
  };
  controller.compound(statement, fields, fromClauseWithKey, getKeys, response);
}; /* END create */

module.exports.update = function(request, response, next) {
  const statement = {
    sql:
      ' BEGIN\n' +
      '   apps.xeam_asset_pkg.process_asset(\n' +
      '     p_user_id => null\n' +
      '   , p_transaction_type => \'UPDATE\'\n' +
      '   , x_return_status => :return_status\n' +
      '   , x_msg_data => :msg_data\n' +
      '   , x_asset_id => :asset_id\n' +
      '   , p_asset_number => :asset_number\n' +
      '   , p_description => :description\n' +
      '   , p_asset_group_id => :asset_group_id\n' +
      '   , p_serial_number => :serial_number\n' +
      '   , p_category_id => :category_id\n' +
      '   , p_owning_department_id => :owning_department_id\n' +
      '   , p_criticality_code => :criticality_code\n' +
      '   , p_wip_accounting_class_code => :wip_accounting_class_code\n' +
      '   , p_status_id => :status_id\n' +
      '   , p_area_id => :area_id\n' +
      '   , p_maintainable_flag => :maintainable_flag\n' +
      '   , p_operation_log_enabled_flag => :operation_log_enabled_flag\n' +
      '   , p_warranty_expiration_date => :warranty_expiration_date\n' +
      '   , p_checked_out_flag => :checked_out_flag\n' +
      '   , p_parent_asset_id => :parent_asset_id\n' +
      '   , p_disassoc_parent_asset_flag => :disassociate_parent_asset_flag\n' +
      '   , p_location_type_code => :location_type_code\n' +
      '   , p_location_id => :location_id\n' +
      '   , p_prod_equip_object_id => :prod_equip_object_id\n' +
      '   , p_fixed_asset_id => :fixed_asset_id\n' +
      '   , p_fixed_asset_synch_flag => :fixed_asset_synchronize_flag\n' +
      '   , p_disassoc_fixed_asset_flag => :disassociate_fixed_asset_flag\n' +
      '   );\n' +
      ' END;\n',
    bindParams: {
      return_status: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
      msg_data: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
      asset_id: {val: request.params.asset_id, dir: oracledb.BIND_INOUT},
      asset_number: request.body.asset_number || null,
      description: request.body.description || null,
      asset_group_id: request.body.asset_group_id || null,
      serial_number: request.body.serial_number || null,
      category_id: request.body.category_id || null,
      owning_department_id: request.body.owning_department_id || null,
      criticality_code: request.body.criticality_code || null,
      wip_accounting_class_code: request.body.wip_accounting_class_code || null,
      status_id: request.body.status_id || null,
      area_id: request.body.area_id || null,
      maintainable_flag: request.body.maintainable_flag || null,
      operation_log_enabled_flag: request.body.operation_log_enabled_flag || null,
      warranty_expiration_date: request.body.warranty_expiration_date || null,
      checked_out_flag: request.body.checked_out_flag || null,
      parent_asset_id: request.body.parent_asset_id || null,
      disassociate_parent_asset_flag: request.body.disassociate_parent_asset_flag || null,
      location_type_code: request.body.location_type_code || null,
      location_id: request.body.location_id || null,
      prod_equip_object_id: request.body.prod_equip_object_id || null,
      fixed_asset_id: request.body.fixed_asset_id || null,
      fixed_asset_synchronize_flag: request.body.fixed_asset_synchronize_flag || null,
      disassociate_fixed_asset_flag: request.body.disassociate_fixed_asset_flag || null
    },
    options: {}
  };
  const getKeys = function(initial, result) {
    return {
      asset_id: parseInt(initial.asset_id)
    };
  };
  controller.compound(statement, fields, fromClauseWithKey, getKeys, response);
}; /* END update */

module.exports.deactivate = function(request, response, next) {
  const statement = {
    sql:
      ' BEGIN\n' +
      '   apps.xeam_asset_pkg.deactivate_asset(\n' +
      '     p_user_id => null\n' +
      '   , x_return_status => :return_status\n' +
      '   , x_msg_data => :msg_data\n' +
      '   , p_asset_id => :asset_id\n' +
      '   );\n' +
      ' END;\n',
    bindParams: {
      return_status: {dir: oracledb.BIND_INOUT, type: oracledb.STRING},
      msg_data: {dir: oracledb.BIND_INOUT, type: oracledb.STRING},
      asset_id: request.params.asset_id
    },
    options: {}
  };
  const getKeys = function(initial, result) {
    return {
      asset_id: parseInt(initial.asset_id)
    };
  };
  controller.compound(statement, fields, fromClauseWithKey, getKeys, response);
}; /* END deactivate */
