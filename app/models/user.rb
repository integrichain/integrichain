class User < ApplicationRecord
  include Clearance::User

  has_many :permissions
  has_many :documents, through: :permissions 
end
