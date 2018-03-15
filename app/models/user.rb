class User < ApplicationRecord
  validates :username, presence: true
  has_many :permissions
  has_many :documents, through: :permissions 
end
