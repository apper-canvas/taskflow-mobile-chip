import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onSearch, onMenuToggle, searchQuery = '' }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <motion.header
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ApperIcon name="Menu" className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

{/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
<ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
              taker pro 3
            </h1>
          </div>
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <SearchBar
              onSearch={onSearch}
              placeholder="Search tasks..."
              className="w-full"
            />
          </div>

          {/* Profile and Settings */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ApperIcon name="Bell" className="w-5 h-5 text-gray-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ApperIcon name="Settings" className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
</div>
    </motion.header>
  );
};

export default Header;
