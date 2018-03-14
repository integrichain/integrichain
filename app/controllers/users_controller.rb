class UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def new
    render :new
  end

  def create
    if @user = User.create(user_params)
      redirect_to @user
    else
      @errors << @user.errors.messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    flash[:notice] = 'User created successfully'
    render :show
  end

  private

  def user_params
    params
      .permit(:username)
  end
end
