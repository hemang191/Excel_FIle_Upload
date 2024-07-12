'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Shipments', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			shipmentType: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			orderNumber: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			orderType: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			sourceReferenceId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			destinationReferenceId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			primaryMode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			expectedDeliveryDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			incoterm: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cargoType: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			materialCode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			quantityUnit: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			shipmentNumber: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Shipments');
	},
};
