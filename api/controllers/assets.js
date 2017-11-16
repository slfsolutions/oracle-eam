const oracledb = require('oracledb');
const controllers = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'organization_id', object: {alias: 'asst', column: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', object: {alias: 'orga', column: 'organization'}},
  {name: 'organization_name', object: {alias: 'orga', column: 'organization_name'}},
  {name: 'asset_type_code', object: {alias: 'asst', column: 'asset_type_code'}},
  {name: 'asset_type', object: {alias: 'asst', column: 'asset_type'}},
  {name: 'asset_id', object: {alias: 'asst', column: 'asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', object: {alias: 'asst', column: 'asset_number'}},
  {name: 'description', object: {alias: 'asst', column: 'description'}},
  {name: 'asset_group_id', object: {alias: 'asst', column: 'asset_group_id', type: oracledb.NUMBER}},
  {name: 'asset_group', object: {alias: 'asgr', column: 'asset_group'}},
  {name: 'asset_group_description', object: {alias: 'asgr', column: 'description'}},
  {name: 'serial_number', object: {alias: 'asst', column: 'serial_number'}},
  {name: 'asset_object_id', object: {alias: 'asst', column: 'asset_object_id', type: oracledb.NUMBER}},
  {name: 'category_id', object: {alias: 'asst', column: 'category_id', type: oracledb.NUMBER}},
  {name: 'category', object: {alias: 'asca', column: 'category'}},
  {name: 'category_class', object: {alias: 'asca', column: 'class'}},
  {name: 'category_subclass', object: {alias: 'asca', column: 'subclass'}},
  {name: 'category_description', object: {alias: 'asca', column: 'description'}},
  {name: 'owning_department_id', object: {alias: 'asst', column: 'owning_department_id', type: oracledb.NUMBER}},
  {name: 'owning_department', object: {alias: 'dept', column: 'department'}},
  {name: 'owning_department_description', object: {alias: 'dept', column: 'description'}},
  {name: 'criticality_code', object: {alias: 'asst', column: 'criticality_code'}},
  {name: 'criticality', object: {alias: 'asst', column: 'criticality'}},
  {name: 'wip_accounting_class', object: {alias: 'asst', column: 'wip_accounting_class'}},
  {name: 'status_id', object: {alias: 'asst', column: 'status_id', type: oracledb.NUMBER}},
  {name: 'status', object: {alias: 'asst', column: 'status'}},
  {name: 'area_id', object: {alias: 'asst', column: 'area_id', type: oracledb.NUMBER}},
  {name: 'area', object: {alias: 'asar', column: 'area'}},
  {name: 'area_description', object: {alias: 'asar', column: 'description'}},
  {name: 'maintainable_flag', object: {alias: 'asst', column: 'maintainable_flag'}},
  {name: 'active_start_date', object: {alias: 'asst', column: 'active_start_date', type: oracledb.DATE}},
  {name: 'active_end_date', object: {alias: 'asst', column: 'active_end_date', type: oracledb.DATE}},
  {name: 'active_flag', object: {alias: 'asst', column: 'active_flag'}},
  {name: 'linear_asset_flag', object: {alias: 'asst', column: 'linear_asset_flag'}},
  {name: 'operation_log_enabled_flag', object: {alias: 'asst', column: 'operation_log_enabled_flag'}},
  {name: 'warranty_expiration_date', object: {alias: 'asst', column: 'warranty_expiration_date', type: oracledb.DATE}},
  {name: 'checkin_status_code', object: {alias: 'asst', column: 'checkin_status_code'}},
  {name: 'checked_out_flag', object: {alias: 'asst', column: 'checked_out_flag'}},
  {name: 'parent_asset_object_id', object: {alias: 'asst', column: 'parent_asset_object_id', type: oracledb.NUMBER}},
  {name: 'parent_asset_id', object: {alias: 'asst', column: 'parent_asset_id', type: oracledb.NUMBER}},
  {name: 'parent_asset_number', object: {alias: 'asst_p', column: 'asset_number'}},
  {name: 'parent_asset_description', object: {alias: 'asst_p', column: 'description'}},
  {name: 'parent_asset_type_code', object: {alias: 'asst_p', column: 'asset_type_code'}},
  {name: 'parent_asset_type', object: {alias: 'asst_p', column: 'asset_type'}},
  {name: 'parent_asset_group_id', object: {alias: 'asst_p', column: 'asset_group_id', type: oracledb.NUMBER}},
  {name: 'parent_asset_group', object: {alias: 'asgr_p', column: 'asset_group'}},
  {name: 'parent_asset_group_description', object: {alias: 'asgr_p', column: 'description'}},
  {name: 'location_type_code', object: {alias: 'asst', column: 'location_type_code'}},
  {name: 'location_id', object: {alias: 'asst', column: 'location_id', type: oracledb.NUMBER}},
  {name: 'location_code', object: {alias: 'asst', column: 'location_code'}},
  {name: 'location_address', object: {alias: 'asst', column: 'location_address'}},
  {name: 'prod_equip_object_id', object: {alias: 'asst', column: 'prod_equip_object_id', type: oracledb.NUMBER}},
  {name: 'prod_equip_organization_id', object: {alias: 'asst', column: 'prod_equip_organization_id', type: oracledb.NUMBER}},
  {name: 'prod_equip_item_id', object: {alias: 'asst', column: 'prod_equip_item_id', type: oracledb.NUMBER}},
  {name: 'prod_equip_serial_number', object: {alias: 'asst', column: 'prod_equip_serial_number'}},
  {name: 'fixed_asset_id', object: {alias: 'asst', column: 'fixed_asset_id', type: oracledb.NUMBER}},
  {name: 'fixed_asset_category_id', object: {alias: 'asst', column: 'fixed_asset_category_id', type: oracledb.NUMBER}},
  {name: 'fixed_asset_major_category', object: {alias: 'asst', column: 'fixed_asset_major_category'}},
  {name: 'fixed_asset_minor_category', object: {alias: 'asst', column: 'fixed_asset_minor_category'}},
  {name: 'fixed_asset_number', object: {alias: 'asst', column: 'fixed_asset_number'}},
  {name: 'fixed_asset_synchronized_flag', object: {alias: 'asst', column: 'fixed_asset_synchronized_flag'}},
  {name: 'latitude', object: {alias: 'asst', column: 'latitude', type: oracledb.NUMBER}},
  {name: 'latitude_degrees', object: {alias: 'asst', column: 'latitude_degrees', type: oracledb.NUMBER}},
  {name: 'latitude_minutes', object: {alias: 'asst', column: 'latitude_minutes', type: oracledb.NUMBER}},
  {name: 'latitude_seconds', object: {alias: 'asst', column: 'latitude_seconds', type: oracledb.NUMBER}},
  {name: 'latitude_direction', object: {alias: 'asst', column: 'latitude_direction'}},
  {name: 'longitude', object: {alias: 'asst', column: 'longitude', type: oracledb.NUMBER}},
  {name: 'longitude_degrees', object: {alias: 'asst', column: 'longitude_degrees', type: oracledb.NUMBER}},
  {name: 'longitude_minutes', object: {alias: 'asst', column: 'longitude_minutes', type: oracledb.NUMBER}},
  {name: 'longitude_seconds', object: {alias: 'asst', column: 'longitude_seconds', type: oracledb.NUMBER}},
  {name: 'longitude_direction', object: {alias: 'asst', column: 'longitude_direction'}},
  {name: 'safety_type_code', object: {alias: 'asst', column: 'safety_type_code'}},
  {name: 'safety_type', object: {alias: 'asst', column: 'safety_type'}},
  {name: 'safety_operating_position_code', object: {alias: 'asst', column: 'safety_operating_position_code'}},
  {name: 'safety_operating_position', object: {alias: 'asst', column: 'safety_operating_position'}},
  {name: 'safety_operating_tag_code', object: {alias: 'asst', column: 'safety_operating_tag_code'}},
  {name: 'safety_operating_tag', object: {alias: 'asst', column: 'safety_operating_tag'}},
  {name: 'safety_shutdown_position_code', object: {alias: 'asst', column: 'safety_shutdown_position_code'}},
  {name: 'safety_shutdown_position', object: {alias: 'asst', column: 'safety_shutdown_position'}},
  {name: 'safety_shutdown_tag_code', object: {alias: 'asst', column: 'safety_shutdown_tag_code'}},
  {name: 'safety_shutdown_tag', object: {alias: 'asst', column: 'safety_shutdown_tag'}},
  {name: 'safety_lockout_device_code', object: {alias: 'asst', column: 'safety_lockout_device_code'}},
  {name: 'safety_lockout_device', object: {alias: 'asst', column: 'safety_lockout_device'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_assets_v asst\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asst.organization_id AND NVL(orga.eam_enabled_flag, \'N\') = \'Y\'\n' +
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
  controllers.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    asset_id: parseInt(request.params.asset_id)
  };
  controllers.detail(fields, fromClauseWithKey, keys, response);
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
  controllers.compound(statement, fields, fromClauseWithKey, getKeys, response);
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
  controllers.compound(statement, fields, fromClauseWithKey, getKeys, response);
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
  controllers.compound(statement, fields, fromClauseWithKey, getKeys, response);
}; /* END deactivate */

module.exports.hierarchy = function(request, response, next) {
}; /* END hierarchy */

module.exports.ancestry = function(request, response, next) {
}; /* END ancestry */
