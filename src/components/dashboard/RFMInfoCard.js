// src/components/dashboard/RFMInfoCard.js
import React, { useState } from 'react';
import { X, HelpCircle, Users, Calendar, DollarSign } from 'lucide-react';
import { COLORS } from '../../styles/ColorStyles';

const RFMInfoCard = ({ onClose }) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-teal-50 to-teal-100 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <HelpCircle size={18} className="mr-2 text-teal-700" />
          <h3 className="text-teal-800 font-medium">Understanding RFM Analysis</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 mb-4">
          RFM Analysis segments customers based on three key metrics to help identify your most valuable customer groups and target your marketing efforts effectively.
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-800">Recency</h4>
            </div>
            <p className="text-sm text-gray-600">
              How recently a customer has made a purchase
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <Users size={16} className="text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-800">Frequency</h4>
            </div>
            <p className="text-sm text-gray-600">
              How often a customer makes purchases
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <DollarSign size={16} className="text-green-600" />
              </div>
              <h4 className="font-medium text-gray-800">Monetary</h4>
            </div>
            <p className="text-sm text-gray-600">
              How much money a customer spends
            </p>
          </div>
        </div>
        
        <div className="bg-teal-50 p-3 rounded-lg text-sm text-teal-800 flex items-start">
          <div className="font-medium mr-2">Tip:</div>
          <div>
            This dashboard segments customers into groups like Champions, Loyal Customers, At Risk, etc. based on their RFM scores. Use these insights to create targeted marketing campaigns for each segment.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFMInfoCard;