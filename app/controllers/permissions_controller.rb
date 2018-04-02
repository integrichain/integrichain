class PermissionsController < ApplicationController
  def new
    @users = User.all
    @doc_id = params[:id]
    @document = Document.find(@doc_id)
    render :new
  end
    
  def create
    @permission = Permission.create(permission_params)
    if @permission.persisted?
      redirect_to @permission
    else
      @errors += @permission.errors.full_messages
      @users = User.all
      @documents = Document.all
      render :new
    end
  end

  def show
    @permission = Permission.find(params[:id])
    flash[:notice] = 'Permission created successfully'
    render :show
  end

  private

  def permission_params
    params[:permission]
        .permit(:user_id, :document_id)
  end
end
