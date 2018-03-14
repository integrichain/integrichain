class UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def new
    render :new
  end

  def create
    @user = User.create(user_params)
    if @user.persisted?
      flash[:notice] = 'User created successfully'
      redirect_to @user
    else
      @errors += @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params
      .permit(:username)
  end
end
