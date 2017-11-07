const
  oracledb = require('oracledb'),
  database = require('../../database'),
  library = require('../library');

/*
* URL query field mappings
*/

const fields = [
  {name: 'asset_id', column: 'asst.asset_id', type: oracledb.NUMBER},
  {name: 'asset_number', column: 'asst.asset_number'},
  {name: 'description', column: 'asst.description'},
  {name: 'organization_id', column: 'asst.organization_id', type: oracledb.NUMBER},
  {name: 'organization', column: 'orga.organization'},
  {name: 'organization_name', column: 'orga.organization_name'},
  {name: 'asset_type_code', column: 'asst.asset_type_code'},
  {name: 'asset_type', column: 'asst.asset_type'},
  {name: 'asset_group_id', column: 'asst.asset_group_id', type: oracledb.NUMBER},
  {name: 'asset_group', column: 'asgr.asset_group'},
  {name: 'asset_group_description', column: 'asgr.description'},
  {name: 'serial_number', column: 'asst.serial_number'},
  {name: 'asset_object_id', column: 'asst.asset_object_id', type: oracledb.NUMBER},
  {name: 'category_id', column: 'asst.category_id', type: oracledb.NUMBER},
  {name: 'category', column: 'asca.category'},
  {name: 'category_class', column: 'asca.class'},
  {name: 'category_subclass', column: 'asca.subclass'},
  {name: 'category_description', column: 'asca.description'},
  {name: 'owning_department_id', column: 'asst.owning_department_id', type: oracledb.NUMBER},
  {name: 'owning_department', column: 'dept.department'},
  {name: 'owning_department_description', column: 'dept.description'},
  {name: 'criticality_code', column: 'asst.criticality_code'},
  {name: 'criticality', column: 'asst.criticality'},
  {name: 'wip_accounting_class', column: 'asst.wip_accounting_class'},
  {name: 'status_id', column: 'asst.status_id', type: oracledb.NUMBER},
  {name: 'status', column: 'asst.status'},
  {name: 'area_id', column: 'asst.area_id', type: oracledb.NUMBER},
  {name: 'area', column: 'asar.area'},
  {name: 'area_description', column: 'asar.description'},
  {name: 'maintainable_flag', column: 'asst.maintainable_flag'},
  {name: 'active_start_date', column: 'asst.active_start_date', type: oracledb.DATE},
  {name: 'active_end_date', column: 'asst.active_end_date', type: oracledb.DATE},
  {name: 'active_flag', column: 'asst.active_flag'},
  {name: 'linear_asset_flag', column: 'asst.linear_asset_flag'},
  {name: 'operation_log_enabled_flag', column: 'asst.operation_log_enabled_flag'},
  {name: 'warranty_expiration_date', column: 'asst.warranty_expiration_date', type: oracledb.DATE},
  {name: 'checkin_status_code', column: 'asst.checkin_status_code'},
  {name: 'checked_out_flag', column: 'asst.checked_out_flag'},
  {name: 'parent_asset_object_id', column: 'asst.parent_asset_object_id', type: oracledb.NUMBER},
  {name: 'parent_asset_id', column: 'asst.parent_asset_id', type: oracledb.NUMBER},
  {name: 'parent_asset_number', column: 'asst_p.asset_number'},
  {name: 'parent_asset_description', column: 'asst_p.description'},
  {name: 'parent_asset_type_code', column: 'asst_p.asset_type_code'},
  {name: 'parent_asset_type', column: 'asst_p.asset_type'},
  {name: 'parent_asset_group_id', column: 'asst_p.asset_group_id', type: oracledb.NUMBER},
  {name: 'parent_asset_group', column: 'asgr_p.asset_group'},
  {name: 'parent_asset_group_description', column: 'asgr_p.description'},
  {name: 'location_type_code', column: 'asst.location_type_code'},
  {name: 'location_id', column: 'asst.location_id', type: oracledb.NUMBER},
  {name: 'location_type_code', column: 'asst.location_type_code'},
  {name: 'location_code', column: 'asst.location_code'},
  {name: 'location_address', column: 'asst.location_address'},
  {name: 'prod_equip_object_id', column: 'asst.prod_equip_object_id', type: oracledb.NUMBER},
  {name: 'prod_equip_organization_id', column: 'asst.prod_equip_organization_id', type: oracledb.NUMBER},
  {name: 'prod_equip_item_id', column: 'asst.prod_equip_item_id', type: oracledb.NUMBER},
  {name: 'prod_equip_serial_number', column: 'asst.prod_equip_serial_number'},
  {name: 'fixed_asset_id', column: 'asst.fixed_asset_id', type: oracledb.NUMBER},
  {name: 'fixed_asset_category_id', column: 'asst.fixed_asset_category_id', type: oracledb.NUMBER},
  {name: 'fixed_asset_major_category', column: 'asst.fixed_asset_major_category'},
  {name: 'fixed_asset_minor_category', column: 'asst.fixed_asset_minor_category'},
  {name: 'fixed_asset_number', column: 'asst.fixed_asset_number'},
  {name: 'fixed_asset_synchronized_flag', column: 'asst.fixed_asset_synchronized_flag'},
  {name: 'latitude', column: 'asst.latitude', type: oracledb.NUMBER},
  {name: 'latitude_degrees', column: 'asst.latitude_degrees', type: oracledb.NUMBER},
  {name: 'latitude_minutes', column: 'asst.latitude_minutes', type: oracledb.NUMBER},
  {name: 'latitude_seconds', column: 'asst.latitude_seconds', type: oracledb.NUMBER},
  {name: 'latitude_direction', column: 'asst.latitude_direction'},
  {name: 'longitude', column: 'asst.longitude', type: oracledb.NUMBER},
  {name: 'longitude_degrees', column: 'asst.longitude_degrees', type: oracledb.NUMBER},
  {name: 'longitude_minutes', column: 'asst.longitude_minutes', type: oracledb.NUMBER},
  {name: 'longitude_seconds', column: 'asst.longitude_seconds', type: oracledb.NUMBER},
  {name: 'longitude_direction', column: 'asst.longitude_direction'},
  {name: 'safety_type_code', column: 'asst.safety_type_code'},
  {name: 'safety_type', column: 'asst.safety_type'},
  {name: 'safety_operating_position_code', column: 'asst.safety_operating_position_code'},
  {name: 'safety_operating_position', column: 'asst.safety_operating_position'},
  {name: 'safety_operating_tag_code', column: 'asst.safety_operating_tag_code'},
  {name: 'safety_operating_tag', column: 'asst.safety_operating_tag'},
  {name: 'safety_shutdown_position_code', column: 'asst.safety_shutdown_position_code'},
  {name: 'safety_shutdown_position', column: 'asst.safety_shutdown_position'},
  {name: 'safety_shutdown_tag_code', column: 'asst.safety_shutdown_tag_code'},
  {name: 'safety_shutdown_tag', column: 'asst.safety_shutdown_tag'},
  {name: 'safety_lockout_device_code', column: 'asst.safety_lockout_device_code'},
  {name: 'safety_lockout_device', column: 'asst.safety_lockout_device'}
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_assets_v asst\n' +
  ' JOIN    apps.xeam_organizations_v orga ON orga.organization_id = asst.organization_id AND NVL(orga.eam_enabled_flag, \'N\') = \'Y\'\n' +
  ' JOIN    apps.xeam_asset_groups_v asgr ON asgr.organization_id = asst.organization_id AND asgr.asset_group_id = asst.asset_group_id\n' +
  ' LEFT    JOIN apps.xeam_asset_categories_v asca ON asca.category_id = asst.category_id\n' +
  ' LEFT    JOIN apps.xeam_departments_v dept ON dept.department_id = asst.owning_department_id\n' +
  ' LEFT    JOIN apps.xeam_asset_areas_v asar ON asar.area_id = asst.area_id\n' +
  ' LEFT    JOIN apps.xeam_assets_v asst_p ON asst_p.asset_id = asst.parent_asset_id\n' +
  ' LEFT    JOIN apps.xeam_asset_groups_v asgr_p ON asgr_p.organization_id = asst_p.organization_id AND asgr_p.asset_group_id = asst_p.asset_group_id\n' +
  ' WHERE   NVL(asst.network_asset_flag, \'N\') = \'N\'\n';

/*
* Command functions
*/

function getList(request, connection, callback) {

  let sql = library.getQueryStatement(
    library.getQueryComponents(request, fields),
    fromClause
  );
  let bindParams = {};
  let options = {
    outFormat: oracledb.OBJECT
  };

  connection.execute(sql, bindParams, options, function(error, result) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result.rows);
  });
} /* END getList */
  
function getDetail(request, connection, callback) {

  let sql = library.getQueryStatement(
    {selectList: library.getSelectList(fields)},
    fromClause + ' AND     asst.asset_id = :asset_id\n'
  );
  let bindParams = {
    asset_id: request.params.asset_id
  };
  let options = {
    outFormat: oracledb.OBJECT
  };
  
  connection.execute(sql, bindParams, options, function(error, result) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result.rows[0]);
  });
} /* END getDetail */
  
function processCreate(request, connection, callback) {

  let sql =
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
  ' END;\n';

  let bindParams = {
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
  };

  connection.execute(sql, bindParams, function(error, result) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result.outBinds);
  });
} /* END processCreate */
  
function processUpdate(request, connection, callback) {

  let sql =
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
  ' END;\n';

  let bindParams = {
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
  };

  connection.execute(sql, bindParams, function(error, result) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result.outBinds);
  });
} /* END processUpdate */
  
function processDeactivate(request, connection, callback) {

  let sql =
  ' BEGIN\n' +
  '   apps.xeam_asset_pkg.deactivate_asset(\n' +
  '     p_user_id => null\n' +
  '   , x_return_status => :return_status\n' +
  '   , x_msg_data => :msg_data\n' +
  '   , p_asset_id => :asset_id\n' +
  '   );\n' +
  ' END;\n';

  let bindParams = {
    return_status: {dir: oracledb.BIND_INOUT, type: oracledb.STRING},
    msg_data: {dir: oracledb.BIND_INOUT, type: oracledb.STRING},
    asset_id: request.params.asset_id
  };

  connection.execute(sql, bindParams, function(error, result) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, result.outBinds);
  });
} /* END processDeactivate */

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  database.executeCommand(request, getList, function(error, result) {
    if (error) {
      console.error(error.message);
    }
    response.json(result);
  });
} /* END list */

module.exports.detail = function(request, response, next) {
  database.executeCommand(request, getDetail, function(error, result) {
    if (error) {
      console.error(error.message);
    }
    response.json(result);
  });
} /* END detail */

module.exports.create = function(request, response, next) {
  database.executeCommand(request, processCreate, function(error, result) {
    if (error) {
      console.error(error.message);
    }
    if (result.return_status !== 'S') {
      response.json(result);
    } else {
      database.executeCommand(
        {params: {asset_id: result.asset_id}},
        getDetail,
        function(error, result) {
          if (error) {
            console.error(error.message);
          }
          response.json(result);
        }
      );
    }
  });
} /* END create */

module.exports.update = function(request, response, next) {
  database.executeCommand(request, processUpdate, function(error, result) {
    if (error) {
      console.error(error.message);
    }
    if (result.return_status !== 'S') {
      response.json(result);
    } else {
      database.executeCommand(
        {params: {asset_id: request.params.asset_id}},
        getDetail,
        function(error, result) {
          if (error) {
            console.error(error.message);
          }
          response.json(result);
        }
      );
    }
  });
} /* END update */

module.exports.deactivate = function(request, response, next) {
  database.executeCommand(request, processDeactivate, function(error, result) {
    if (error) {
      console.error(error.message);
    }
    if (result.return_status !== 'S') {
      response.json(result);
    } else {
      database.executeCommand(
        {params: {asset_id: request.params.asset_id}},
        getDetail,
        function(error, result) {
          if (error) {
            console.error(error.message);
          }
          response.json(result);
        }
      );
    }
  });
} /* END deactivate */
