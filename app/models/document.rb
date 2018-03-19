class Document < ApplicationRecord
  has_one_attached :doc
  has_many :users, through: :permissions
  has_many :permissions
  validates_presence_of :title # prevent blank titles
end
